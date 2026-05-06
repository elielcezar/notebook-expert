# Documentação do Projeto

Esta pasta contém toda a documentação técnica do projeto Notebook Expert.

## 📚 Documentos Disponíveis

### [Integração WordPress Headless](./integracao-wordpress-headless.md)
Documentação completa da integração do frontend Next.js com WordPress Headless, incluindo:
- Arquitetura do sistema
- Configuração passo a passo
- Problemas encontrados e soluções
- Checklist de deploy
- Fluxo completo de funcionamento

**Recomendado para:** Desenvolvedores que vão trabalhar no projeto ou fazer manutenção.

---

### [Detalhes Técnicos](./detalhes-tecnicos.md)
Análise técnica profunda da implementação:
- Por que certas decisões foram tomadas
- Como cada componente funciona internamente
- Troubleshooting avançado
- Otimizações e melhorias futuras

**Recomendado para:** Desenvolvedores experientes que querem entender os detalhes da implementação.

---

## 🚀 Início Rápido

Se você está começando a trabalhar no projeto:

1. Leia primeiro [Integração WordPress Headless](./integracao-wordpress-headless.md)
2. Configure os secrets no GitHub (seção "Configuração")
3. Teste o fluxo completo com um post de teste
4. Consulte "Troubleshooting" se encontrar problemas

---

## 📝 Estrutura do Projeto

```
notebook-expert/
├── app/
│   └── dicas/              # Páginas do blog
│       ├── page.tsx        # Lista de posts
│       └── [slug]/
│           └── page.tsx   # Post individual
├── lib/
│   └── wordpress.ts        # Funções de integração WordPress
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── wordpress/
│   └── github-deploy-trigger/  # Plugin WordPress
└── DOCS/                   # Esta pasta
```

---

## 🔗 Links Úteis

- **Frontend (produção):** https://notebookexpert.com.br
- **WordPress Admin (CMS headless):** https://admin.notebookexpert.com.br
- **GitHub Actions:** https://github.com/elielcezar/notebook-expert/actions
- **Repositório:** https://github.com/elielcezar/notebook-expert

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a seção "Troubleshooting" nos documentos
2. Verifique logs do GitHub Actions
3. Verifique logs do plugin WordPress
4. Teste a API WordPress diretamente

---

**Última atualização:** 06/05/2026

