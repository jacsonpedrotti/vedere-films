import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>Vedere Films - Películas Automotivas e Residenciais em SC</title>
        <meta name="description" content="Especialistas em películas automotivas, residenciais e proteção premium para veículos. Atendemos SC e região. Qualidade, tecnologia e atendimento consultivo." />
        <meta name="keywords" content="película automotiva, película residencial, proteção solar, envelopamento, PPF, nano cerâmica, SC, Florianópolis, Vedere Films" />
        <meta property="og:title" content="Vedere Films - Películas Automotivas e Residenciais em SC" />
        <meta property="og:description" content="Especialistas em películas automotivas, residenciais e proteção premium para veículos. Atendemos SC e região." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vederefilms.com.br" />
        <meta property="og:image" content="/logo-simples.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vedere Films - Películas Automotivas e Residenciais em SC" />
        <meta name="twitter:description" content="Especialistas em películas automotivas, residenciais e proteção premium para veículos. Atendemos SC e região." />
        <meta name="twitter:image" content="/logo-simples.png" />
        <link rel="canonical" href="https://www.vederefilms.com.br" />
      </Head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
