import { z } from "zod";

export type EstadoRecorrido = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EstadoRecorridoResponse = EstadoRecorrido[];

export const createEstadoRecorridoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export const updateEstadoRecorridoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").optional(),
});

export type CreateEstadoRecorridoRequest = z.infer<
  typeof createEstadoRecorridoSchema
>;

export type EditarEstadoRecorridoData = z.infer<
  typeof updateEstadoRecorridoSchema
>;
