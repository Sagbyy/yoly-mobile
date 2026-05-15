import { cn } from "@/shared/lib/utils";
import { Button as PrimitiveButton } from "@/shared/ui/primitives/button";
import { Text } from "@/shared/ui/primitives/text";
import { ArrowRight } from "lucide-react-native";
import { ActivityIndicator, type PressableProps } from "react-native";

type Variant = "black" | "white";

interface YolyButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  fullWidth?: boolean;
  withArrow?: boolean;
  loading?: boolean;
  className?: string;
}

const styles: Record<Variant, { button: string; text: string; arrow: string; indicator: string }> =
  {
    black: {
      button: "bg-ink active:bg-neutral-900",
      text: "text-white",
      arrow: "#FFFFFF",
      indicator: "#FFFFFF",
    },
    white: {
      button: "bg-neutral-100 active:bg-neutral-200",
      text: "text-ink",
      arrow: "#0B0B0D",
      indicator: "#0B0B0D",
    },
  };

export function YolyButton({
  label,
  variant = "black",
  fullWidth = false,
  withArrow = false,
  loading = false,
  className,
  disabled,
  ...props
}: YolyButtonProps) {
  const s = styles[variant];

  return (
    <PrimitiveButton
      className={cn(
        "h-14 rounded-full px-6",
        s.button,
        fullWidth && "w-full",
        (loading || disabled) && "opacity-60",
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading
        ? <ActivityIndicator color={s.indicator} size="small" />
        : (
          <>
            <Text className={cn("font-geist-medium text-body", s.text)}>{label}</Text>
            {withArrow && <ArrowRight size={18} color={s.arrow} strokeWidth={2} />}
          </>
        )
      }
    </PrimitiveButton>
  );
}
