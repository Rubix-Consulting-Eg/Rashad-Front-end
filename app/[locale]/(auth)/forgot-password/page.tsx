"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [resetToken, setResetToken] = useState<string | null>(null);

  return (
    <AuthPageLayout title={t("welcomeBack")} subtitle={t("welcomeSubtitle")}>
      {resetToken ? (
        <ResetPasswordForm resetToken={resetToken} />
      ) : (
        <ForgotPasswordForm onOtpVerified={(token) => setResetToken(token)} />
      )}
    </AuthPageLayout>
  );
}
