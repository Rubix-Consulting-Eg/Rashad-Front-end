import { Locale } from "next-intl";
import { headers } from "next/headers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";

export const metadata = {
  title: "Rashad Engine",
  description: "Rashad Engine - Rubix",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = (headersList.get("x-next-intl-locale") ?? "en") as Locale;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        style={{ fontFamily: "'DIN Next LT Arabic', sans-serif" }}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
