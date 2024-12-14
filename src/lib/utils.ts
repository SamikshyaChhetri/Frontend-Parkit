import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const a = 10;  // this is normal export 

const b = 20;
export default b;   // this is default export (1 liner mildaina)

// aba difference import garda dekhinxa
// lets go to page.tsx   uuta aau na