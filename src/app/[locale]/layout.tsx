import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "@/components/NavBar/NavBar";
import Theme from "@/components/Theme/Theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <Theme>
          <CssBaseline />
          <body>
            <header>
              {/* MUI Mobile First */}
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </header>

            <NavBar />

            {children}
          </body>
        </Theme>
      </NextIntlClientProvider>
    </html>
  );
}
