"use client";

import { useTranslations } from "next-intl";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";

export default function RegisterPage() {
  const t = useTranslations("auth");

  return (
    <AuthPageLayout title={t("welcomeBack")} subtitle={t("welcomeSubtitle")}>
      <RegisterForm />
    </AuthPageLayout>
  );
}
