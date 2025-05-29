// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Define userRole (temporary static value, replace with actual logic if needed)
export const userRole = "ketoan"; // Or "admin", depending on the user

// export const userRole = localStorage.getItem("userRole") || "admin";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}