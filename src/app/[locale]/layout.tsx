import { NextIntlClientProvider, useMessages } from "next-intl";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <header>
          {/* MUI Mobile First */}
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </header>

        <NextIntlClientProvider messages={messages}>
          <NavBar />

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
