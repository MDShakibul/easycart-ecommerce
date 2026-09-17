export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (input === null || input === undefined || input === false || input === "") {
      continue;
    }
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested !== "") out.push(nested);
      continue;
    }
    out.push(String(input));
  }

  return out.join(" ");
}