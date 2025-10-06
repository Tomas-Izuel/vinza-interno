import { Meta } from "../common.type";
import { z } from "zod";

export type EstadoReserva = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EstadoReservaResponse = {
  items: EstadoReserva[];
  meta: Meta;
};

// Esquemas de validación
export const CrearEstadoReservaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export const updateEstadoReservaSchema = z.object({
  nombre: z.string().min(1, "El estado es requerido").optional(),
});

export type CrearEstadoReservaData = z.infer<typeof CrearEstadoReservaSchema>;
export type EditarEstadoReservaData = z.infer<typeof updateEstadoReservaSchema>;
