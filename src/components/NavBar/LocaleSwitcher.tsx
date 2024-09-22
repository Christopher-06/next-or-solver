import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import Link from "next/link";
import { supportedLocales } from "../../i18n";

export default function LocaleSwitcher() {
  const t = useTranslations();

  return (
    <>
      <Typography variant="h5" noWrap>{t('locale_switch.helptext')}</Typography>
      {supportedLocales.map((item) => (
        <Link key={item} locale={false} href={"/" + item} style={{ margin: 3 }}>
          {item}
        </Link>
      ))}
    </>
  );
}
