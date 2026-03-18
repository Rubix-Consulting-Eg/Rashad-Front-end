"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [resetData, setResetData] = useState<{
    email: string;
    otp: string;
  } | null>(null);

  return (
    <AuthPageLayout title={t("welcomeBack")} subtitle={t("welcomeSubtitle")}>
      {resetData ? (
        <ResetPasswordForm email={resetData.email} otp={resetData.otp} />
      ) : (
        <ForgotPasswordForm
          onOtpVerified={(email, otp) => setResetData({ email, otp })}
        />
      )}
    </AuthPageLayout>
  );
}
