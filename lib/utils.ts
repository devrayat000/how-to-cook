import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...classValues: ClassValue[]) {
  return twMerge(clsx(...classValues));
}
