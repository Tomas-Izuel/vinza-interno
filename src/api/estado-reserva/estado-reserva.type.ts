import { Meta } from "../common.type";
import { z } from "zod";

export type EstadoReserva = {
  id: number;
  nombre: string;
  descripcion: string;
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
  descripcion: z.string().optional(),
});

export const EditarEstadoReservaSchema = CrearEstadoReservaSchema.partial();

export type CrearEstadoReservaData = z.infer<typeof CrearEstadoReservaSchema>;
export type EditarEstadoReservaData = z.infer<typeof EditarEstadoReservaSchema>;
