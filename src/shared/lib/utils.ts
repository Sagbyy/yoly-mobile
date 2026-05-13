import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-display", "text-title", "text-h1", "text-h2", "text-body", "text-caption", "text-micro"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
