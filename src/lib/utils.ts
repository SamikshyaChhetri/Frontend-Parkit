import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize=(input:string)=>{
  const splittedInput=input.split("");
  const capitalizedLetter=splittedInput[0].toUpperCase();
  splittedInput[0]=capitalizedLetter;
  return splittedInput.join("");
}