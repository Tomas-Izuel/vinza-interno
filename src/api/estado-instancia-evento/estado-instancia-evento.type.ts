import { Meta } from "../common.type";
import { z } from "zod";

export type EstadoInstanciaEvento = {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EstadoInstanciaEventoResponse = {
  items: EstadoInstanciaEvento[];
  meta: Meta;
};

// Esquemas de validación
export const CrearEstadoInstanciaEventoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

export const EditarEstadoInstanciaEventoSchema =
  CrearEstadoInstanciaEventoSchema.partial();

export type CrearEstadoInstanciaEventoData = z.infer<
  typeof CrearEstadoInstanciaEventoSchema
>;
export type EditarEstadoInstanciaEventoData = z.infer<
  typeof EditarEstadoInstanciaEventoSchema
>;
