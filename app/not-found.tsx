import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground">
            Desculpe, a página que você está procurando não existe.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
        >
          <Home className="w-5 h-5" />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

