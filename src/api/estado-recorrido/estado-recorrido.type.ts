import { z } from "zod";

export type EstadoRecorrido = {
  id: number;
  nombre: string;
  descripcion: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EstadoRecorridoResponse = EstadoRecorrido[];

export const createEstadoRecorridoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

export const updateEstadoRecorridoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").optional(),
  descripcion: z.string().optional(),
});

export type CreateEstadoRecorridoRequest = z.infer<
  typeof createEstadoRecorridoSchema
>;

export type EditarEstadoRecorridoData = z.infer<
  typeof updateEstadoRecorridoSchema
>;
