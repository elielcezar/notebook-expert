// Converte DOCS/posts-site-expert.md no JSON lido pelo plugin importador-posts.
//
// Uso: node scripts/gerar-posts-importacao.mjs
//
// Falha (exit 1) se algum post vier incompleto, sem marca reconhecida ou com
// slug repetido — melhor descobrir aqui do que no meio da importação.

import { readFileSync, writeFileSync } from 'node:fs';

const ORIGEM = 'DOCS/posts-site-expert.md';
const DESTINO = 'wordpress/importador-posts/posts.json';

// Ordem importa: a primeira que casar com o título vence
const MARCAS = [
  ['Sony VAIO', /sony vaio/i],
  ['MacBook', /macbook/i],
  ['Notebook Gamer', /gamer/i],
  ['Dell', /\bdell\b/i],
  ['Acer', /\bacer\b/i],
  ['Lenovo', /\blenovo\b/i],
  ['ASUS', /\basus\b/i],
  ['Samsung', /\bsamsung\b/i],
  ['HP', /\bhp\b/i],
  ['Avell', /\bavell\b/i],
  ['LG', /\blg\b/i],
  ['Positivo', /\bpositivo\b/i],
];

const erros = [];

const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => escapar(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Markdown do arquivo (parágrafos, ### e listas "- ") → blocos do Gutenberg
function paraBlocos(linhas) {
  const blocos = [];
  let lista = [];
  let paragrafo = [];

  const fecharLista = () => {
    if (!lista.length) return;
    const itens = lista
      .map((i) => `<!-- wp:list-item -->\n<li>${inline(i)}</li>\n<!-- /wp:list-item -->`)
      .join('\n');
    blocos.push(`<!-- wp:list -->\n<ul class="wp-block-list">${itens}</ul>\n<!-- /wp:list -->`);
    lista = [];
  };
  const fecharParagrafo = () => {
    if (!paragrafo.length) return;
    blocos.push(`<!-- wp:paragraph -->\n<p>${inline(paragrafo.join(' '))}</p>\n<!-- /wp:paragraph -->`);
    paragrafo = [];
  };

  for (const linha of linhas) {
    const t = linha.trim();
    if (!t) { fecharLista(); fecharParagrafo(); continue; }
    // Nota de revisão de quem montou o arquivo, não é conteúdo da cliente
    if (t.startsWith('> **Atenção:**')) continue;
    if (t.startsWith('### ')) {
      fecharLista(); fecharParagrafo();
      blocos.push(`<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">${inline(t.slice(4))}</h3>\n<!-- /wp:heading -->`);
    } else if (t.startsWith('- ')) {
      fecharParagrafo();
      lista.push(t.slice(2));
    } else {
      fecharLista();
      paragrafo.push(t);
    }
  }
  fecharLista(); fecharParagrafo();
  return blocos.join('\n\n');
}

const md = readFileSync(ORIGEM, 'utf8').replace(/\r\n/g, '\n');
const secoes = md.split(/^## (?=\d+\. )/m).slice(1);

// Minutos já usados por dia, para espaçar os horários na ordem do arquivo
const minutosPorDia = {};

const posts = secoes.map((secao) => {
  const linhas = secao.replace(/\n---\s*$/, '').split('\n');
  const [, numero, titulo] = linhas[0].match(/^(\d+)\. (.+)$/);
  const campo = (nome) => {
    const l = linhas.find((x) => x.startsWith(`- **${nome}:**`));
    return l ? l.slice(`- **${nome}:**`.length).trim() : '';
  };

  const metaDescription = campo('Meta description');
  const enviado = campo('Enviado em');
  const marca = MARCAS.find(([, re]) => re.test(titulo))?.[0];

  if (!metaDescription) erros.push(`#${numero}: sem Meta description`);
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(enviado)) erros.push(`#${numero}: "Enviado em" inválido (${enviado})`);
  if (!marca) erros.push(`#${numero}: marca não reconhecida em "${titulo}"`);

  // Corpo = tudo depois do bloco de metadados do topo
  const inicioCorpo = linhas.findIndex((l, i) => i > 0 && l.trim() && !l.startsWith('- **'));
  const conteudo = paraBlocos(linhas.slice(inicioCorpo));
  if (!conteudo) erros.push(`#${numero}: corpo vazio`);

  // Dia do envio a partir das 09:00, um minuto a mais por post
  const [d, m, a] = enviado.split('/');
  const dia = `${a}-${m}-${d}`;
  const min = (minutosPorDia[dia] = (minutosPorDia[dia] ?? -1) + 1);
  const hora = String(9 + Math.floor(min / 60)).padStart(2, '0');
  const data = `${dia} ${hora}:${String(min % 60).padStart(2, '0')}:00`;

  return {
    numero: Number(numero),
    titulo,
    slug: slugify(titulo),
    resumo: metaDescription,
    chamada: metaDescription,
    categoria: marca,
    data,
    conteudo,
  };
});

const slugs = posts.map((p) => p.slug);
slugs.filter((s, i) => slugs.indexOf(s) !== i).forEach((s) => erros.push(`slug repetido: ${s}`));

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s):\n  ` + erros.join('\n  '));
  process.exit(1);
}

writeFileSync(DESTINO, JSON.stringify(posts, null, 2) + '\n');

const porMarca = posts.reduce((acc, p) => ((acc[p.categoria] = (acc[p.categoria] ?? 0) + 1), acc), {});
console.log(`✓ ${posts.length} posts gravados em ${DESTINO}`);
console.log('  Por categoria:', Object.entries(porMarca).map(([k, v]) => `${k} ${v}`).join(', '));
console.log(`  Datas: ${posts[0].data} → ${posts.at(-1).data}`);
