"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  CategoriaEventoResponse,
  CreateCategoriaEventoRequest,
  EditarCategoriaEventoData,
} from "./categoria-evento.type";

export const getCategorias = async () => {
  try {
    return await fetchApiWithAuth<CategoriaEventoResponse>(
      "/categoria-eventos",
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener las categorías de evento";
    errorLogger(error, "[CATEGORIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage, { cause: error });
  }
};

export const createCategoriaEvento = async (
  data: CreateCategoriaEventoRequest,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      "/categoria-eventos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear la categoría de evento";
    errorLogger(error, "[CATEGORIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const editarCategoriaEvento = async (
  id: number,
  data: EditarCategoriaEventoData,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/categoria-eventos/${id}`,
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
      error instanceof Error
        ? error.message
        : "Error al editar la categoría de evento";
    errorLogger(error, "[CATEGORIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const canDeleteCategoriaEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ canDelete: boolean }>(
      `/categoria-eventos/${id}/can-delete`,
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al verificar si se puede eliminar la categoría de evento";
    errorLogger(error, "[CATEGORIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const eliminarCategoriaEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/categoria-eventos/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar la categoría de evento";
    errorLogger(error, "[CATEGORIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
