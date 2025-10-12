import { z } from "zod";
import { Meta } from "../common.type";

export type EstadoEvento = {
  id: number;
  nombre: string;
  descripcion: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EstadosEventoResponse = {
  items: EstadoEvento[];
  meta: Meta;
};

export const createEstadoEventoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

export const updateEstadoEventoSchema = z.object({
  nombre: z.string().min(1, "El estado es requerido").optional(),
  descripcion: z.string().optional(),
});

export type CreateEstadoEventoRequest = z.infer<
  typeof createEstadoEventoSchema
>;

export type EditarEstadoEventoData = z.infer<typeof updateEstadoEventoSchema>;
