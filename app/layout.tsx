import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assistência Técnica para Notebooks em Curitiba | Tech Repair Spot",
  description: "A melhor de Curitiba em conserto de notebooks, com atendimento personalizado e garantia total. 16 anos de experiência em assistência técnica especializada.",
  keywords: "assistência técnica notebooks, conserto notebook Curitiba, reparo notebook, manutenção notebook, assistência técnica Curitiba",
  authors: [{ name: "Tech Repair Spot" }],
  creator: "Tech Repair Spot",
  publisher: "Tech Repair Spot",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seudominio.com/",
    title: "Assistência Técnica para Notebooks em Curitiba | Tech Repair Spot",
    description: "A melhor de Curitiba em conserto de notebooks, com atendimento personalizado e garantia total. 16 anos de experiência.",
    siteName: "Tech Repair Spot",
    images: [
      {
        url: "/hero-tech.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Repair Spot - Assistência Técnica de Notebooks",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Assistência Técnica para Notebooks em Curitiba",
    description: "A melhor de Curitiba em conserto de notebooks, com atendimento personalizado e garantia total.",
    images: ["/hero-tech.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "seu-codigo-de-verificacao-google",
  },

  // Outros metadados
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Tech Repair Spot",
              "description": "Assistência técnica especializada em notebooks em Curitiba",
              "image": "/clients/notebookexpert/logo.webp",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Curitiba",
                "addressRegion": "PR",
                "addressCountry": "BR"
              },
              "telephone": "+55-41-99887-0606",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

