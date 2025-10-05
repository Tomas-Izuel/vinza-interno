import { Bodega } from "@/api/bodegas/bodega.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorLogger = (error: unknown, method?: string) => {
  const timestamp = new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const methodInfo = method ? `[${method}]` : "[Unknown Method]";

  console.log("--------------------------------");
  console.error(`ERROR ${methodInfo} - ${timestamp}`);
  console.error("Error details:", error);

  if (error instanceof Error) {
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
  }

  console.log("--------------------------------");
};

export function extractBodegaAdress(bodega: Bodega) {
  return bodega.sucursales.find((sucursal) => sucursal.es_principal)?.direccion;
}

export type FilterRecord = Record<
  string,
  | string
  | number
  | boolean
  | undefined
  | Date
  | Array<string | number | boolean | Date>
  | null
>;

export function filtersToSearchParams(filters?: FilterRecord): string {
  if (!filters) return "";
  const cleanedFilters: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    // Skip undefined, null, empty string, and empty array values
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value) && value.length === 0) return;

    if (Array.isArray(value)) {
      // Handle arrays by filtering out invalid values and converting Date to ISO string
      const cleanedArray = value
        .filter((item) => item !== undefined && item !== null && item !== "")
        .map((item) => (item instanceof Date ? item.toISOString() : item));
      if (cleanedArray.length > 0) {
        cleanedFilters[key] = cleanedArray.join(",");
      }
    } else {
      // Handle non-array values, converting Date to ISO string
      cleanedFilters[key] =
        value instanceof Date ? value.toISOString() : value.toString();
    }
  });

  return new URLSearchParams(cleanedFilters).toString();
}
