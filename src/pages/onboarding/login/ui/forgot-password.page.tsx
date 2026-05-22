import { useRouter } from "expo-router";
import { useState } from "react";

import { ForgotPasswordForm } from "./components/forgot-password-form";
import { ForgotPasswordSuccess } from "./components/forgot-password-success";

export function ForgotPasswordPage() {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  if (sent) {
    return <ForgotPasswordSuccess onBack={() => router.back()} />;
  }

  return <ForgotPasswordForm onSuccess={() => setSent(true)} />;
}
