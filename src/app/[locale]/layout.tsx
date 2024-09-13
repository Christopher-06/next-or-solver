import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  const locale = useLocale();

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
