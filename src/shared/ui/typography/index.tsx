import { Text } from "@/shared/ui/primitives/text";
import { cn } from "@/shared/lib/utils";
import type { ComponentProps } from "react";
import type { TextProps } from "react-native";

type TypographyProps = Omit<ComponentProps<typeof Text>, "variant"> & TextProps;

export function Display({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-display", className)}
      {...props}
    />
  );
}

export function Title({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-title", className)}
      {...props}
    />
  );
}

export function H1({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-h1", className)}
      role="heading"
      aria-level="1"
      {...props}
    />
  );
}

export function H2({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-h2", className)}
      role="heading"
      aria-level="2"
      {...props}
    />
  );
}

export function Body({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-regular text-body", className)}
      {...props}
    />
  );
}

export function Caption({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-caption text-muted-foreground", className)}
      {...props}
    />
  );
}

export function Micro({ className, ...props }: TypographyProps) {
  return (
    <Text
      className={cn("font-geist-medium text-micro uppercase tracking-[0.8px] text-muted-foreground", className)}
      {...props}
    />
  );
}
