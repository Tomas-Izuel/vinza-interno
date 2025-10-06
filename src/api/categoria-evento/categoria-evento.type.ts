import { z } from "zod";

export type CategoriaEvento = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CategoriaEventoResponse = CategoriaEvento[];

export const createCategoriaEventoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export const updateCategoriaEventoSchema = z.object({
  nombre: z.string().min(1, "El estado es requerido").optional(),
});

export type CreateCategoriaEventoRequest = z.infer<
  typeof createCategoriaEventoSchema
>;

export type EditarCategoriaEventoData = z.infer<
  typeof updateCategoriaEventoSchema
>;
