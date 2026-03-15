"use client";

import { useTranslations } from "next-intl";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <AuthPageLayout title={t("welcomeBack")} subtitle={t("welcomeSubtitle")}>
      <LoginForm />
    </AuthPageLayout>
  );
}
