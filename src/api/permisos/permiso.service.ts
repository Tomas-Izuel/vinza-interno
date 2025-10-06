"use server";

import { fetchApiWithAuth } from "@/lib/utils.server";
import { EditarPermisoData, Permiso } from "./permiso.type";

export const getPermisos = async () => {
  try {
    const response = await fetchApiWithAuth<Permiso[]>("/rbac/permissions");
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener los permisos";
    console.error("[PERMISOS]: ", error);
    throw new Error(errorMessage);
  }
};

export const editarPermiso = async (id: number, data: EditarPermisoData) => {
  try {
    const response = await fetchApiWithAuth<Permiso>(
      `/rbac/permissions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al editar el permiso";
    console.error("[PERMISOS]: ", error);
    throw new Error(errorMessage);
  }
};
