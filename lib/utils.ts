import { twMerge } from "tw-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...classValues: ClassValue[]) {
  return twMerge(clsx(...classValues));
}
