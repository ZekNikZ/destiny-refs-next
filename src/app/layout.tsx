import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import type { Metadata } from "next";
import Layout from "@/components/Layout";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "./providers";
import { Bebas_Neue } from "next/font/google";
import GlobalDataLoader from "@/data/GlobalDataLoader";

const bebasNeueFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

// TODO: page metadata
export const metadata: Metadata = {
  title: "Destiny Refs",
  description: "Reference materials for Destiny 2",
  icons: ["/destiny.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebasNeueFont.className} suppressHydrationWarning>
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <Providers>
          <GlobalDataLoader>
            <Layout>{children}</Layout>
          </GlobalDataLoader>
        </Providers>
      </body>
    </html>
  );
}
