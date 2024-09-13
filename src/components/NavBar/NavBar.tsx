import { useTranslations } from "next-intl";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { supportedLocales } from "../../i18n";

// EXAMPLE NAVIGATION BAR

export default function NavBar() {
  const t = useTranslations();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">{t("navbar.title")}</Typography>
          <Typography variant="h6">{t("navbar.description")}</Typography>

          {/* Spawn german / english switcher on the right side */}
          <div style={{ marginLeft: "auto" }}>
            <p>Choose Language</p>
            {supportedLocales.map((item) => (
              <Link
                key={item}
                locale={false}
                href={"/" + item}
                style={{ margin: 3 }}
              >
                {item}
              </Link>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
