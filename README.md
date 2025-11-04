# Tech Repair Spot - Next.js

Landing page profissional para assistência técnica de notebooks em Curitiba, construída com Next.js 14+ App Router, TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI baseados em Radix UI
- **Lucide React** - Ícones
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Font Awesome** - Ícones adicionais

## 📋 Funcionalidades

- ✅ **SEO Otimizado** - Meta tags, Open Graph, Twitter Cards e Structured Data
- ✅ **Responsivo** - Adaptado para desktop, tablet e mobile
- ✅ **Variantes Portrait/Landscape** - Layouts otimizados para diferentes orientações
- ✅ **Performance** - SSG/SSR com Next.js para carregamento rápido
- ✅ **Acessibilidade** - Componentes acessíveis do Radix UI
- ✅ **Blog (estrutura)** - Preparado para integração com WordPress Headless

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📁 Estrutura do Projeto

```
tech-repair-spot/
├── app/                    # Next.js App Router
│   ├── blog/              # Estrutura do blog
│   │   ├── [slug]/       # Páginas dinâmicas de posts
│   │   └── page.tsx      # Lista de posts
│   ├── layout.tsx        # Layout raiz com metadata
│   ├── page.tsx          # Página inicial
│   ├── not-found.tsx     # Página 404
│   ├── providers.tsx     # Context providers (QueryClient, etc.)
│   └── globals.css       # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Business.tsx
│   ├── ExpertTip.tsx
│   ├── Testimonials.tsx
│   ├── Prevention.tsx
│   └── Footer.tsx
├── lib/                   # Utilitários e helpers
│   ├── utils.ts          # Funções auxiliares
│   └── wordpress.ts      # Integração WordPress (placeholder)
├── hooks/                 # React hooks customizados
├── utils/                 # Funções utilitárias
├── public/                # Assets estáticos
├── next.config.js        # Configuração Next.js
├── tailwind.config.ts    # Configuração Tailwind
└── tsconfig.json         # Configuração TypeScript
```

## 🌐 Integração WordPress Headless (Preparada)

O projeto está estruturado para integração com WordPress Headless:

1. **Configurar variável de ambiente** em `.env.local`:
```env
NEXT_PUBLIC_WP_API_URL=https://seu-wordpress.com/wp-json/wp/v2
```

2. **Usar as funções em `lib/wordpress.ts`**:
```typescript
import { getPosts, getPostBySlug } from '@/lib/wordpress';
```

3. **Páginas de blog** já estão prontas em `app/blog/` com:
   - SSR/ISR configurado (revalidação a cada 60 segundos)
   - Metadata dinâmica para SEO
   - Estrutura de dados compatível com WordPress REST API

## 🎨 Variantes de Orientação

O projeto possui variantes Tailwind customizadas para portrait/landscape:

```tsx
<div className="landscape:pt-16 portrait:pb-20">
  {/* Conteúdo com estilos diferentes por orientação */}
</div>
```

## 📱 Base Path

Configurado para deploy em subdiretório: `/clients/notebookexpert/`

Para alterar, edite `next.config.js`:
```javascript
basePath: '/seu-path',
assetPrefix: '/seu-path',
```

## 🔧 Configurações Importantes

### Metadata SEO
Edite em `app/layout.tsx` para personalizar:
- Título e descrição
- Open Graph tags
- Twitter Cards
- Structured Data (Schema.org)

### Base URL para Assets
Imagens devem estar em `public/` e são referenciadas sem prefixo:
```tsx
<Image src="/logo.webp" alt="Logo" width={192} height={60} />
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance)
- **Static Generation**: Páginas principais pré-renderizadas
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automático com Next.js

## 🚢 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Build Manual
```bash
npm run build
npm start
```

## 📝 To-Do

- [ ] Configurar WordPress Headless
- [ ] Adicionar variável de ambiente para API do Google Places (avaliações)
- [ ] Configurar Google Search Console
- [ ] Implementar Analytics
- [ ] Adicionar sitemap.xml automático
- [ ] Configurar robots.txt personalizado

## 📄 Licença

Propriedade de Tech Repair Spot. Todos os direitos reservados.

## 🤝 Suporte

Para dúvidas e suporte, entre em contato:
- WhatsApp: (41) 99887-0606
- Email: atendimento@notebookexpert.com.br
