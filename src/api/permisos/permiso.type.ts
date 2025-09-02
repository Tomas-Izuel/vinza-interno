import { Meta } from "../common.type";
import { z } from "zod";

export type Permiso = {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

// Esquemas de validación
export const EditarPermisoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").optional(),
  descripcion: z.string().optional(),
});

export type EditarPermisoData = z.infer<typeof EditarPermisoSchema>;
