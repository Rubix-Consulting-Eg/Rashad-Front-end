import { Locale } from "next-intl";
import { headers } from "next/headers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = (headersList.get("x-next-intl-locale") ?? "en") as Locale;
  return (
    <html lang={locale} dir={"ltr"} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
