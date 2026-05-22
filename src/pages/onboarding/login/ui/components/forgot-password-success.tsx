import { Body, H1, StepLayout, YolyButton } from "@/shared/ui";

interface ForgotPasswordSuccessProps {
  onBack: () => void;
}

export function ForgotPasswordSuccess({ onBack }: ForgotPasswordSuccessProps) {
  return (
    <StepLayout
      footer={
        <YolyButton
          label="Retour à la connexion"
          withArrow
          fullWidth
          onPress={onBack}
        />
      }
    >
      <H1 className="mb-3">Email envoyé !</H1>
      <Body className="text-neutral-500">
        Un lien de réinitialisation a été envoyé à ton adresse email. Vérifie
        ta boîte de réception.
      </Body>
    </StepLayout>
  );
}
