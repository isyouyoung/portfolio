import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 합성 + 충돌 해소.
 * 예) cn("p-2", isActive && "bg-red-500", "p-4") → "bg-red-500 p-4"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
