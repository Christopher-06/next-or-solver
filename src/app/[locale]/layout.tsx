/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 2 of the License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*/

import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "@/components/NavBar/NavBar";
import Theme from "@/components/Theme/Theme";
import StoreProvider from "@/store/StoreProvider";
import Footer from "@/components/Footer/Footer"; 
import { Container } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <StoreProvider>
      <html lang={locale} suppressHydrationWarning>
        <body style={{minWidth : "1000px"}}>
          <NextIntlClientProvider messages={messages}>
            <InitColorSchemeScript attribute="class" />

            <main>
              <Theme>
                <header>
                  {/* MUI Mobile First */}
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </header>

                <CssBaseline />

                <NavBar />

                {children}
                <Container><br>
                </br>
                  </Container>    
                <Footer /> 
              </Theme>
            </main>
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
