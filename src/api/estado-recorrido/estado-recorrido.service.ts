"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadoRecorrido,
  CreateEstadoRecorridoRequest,
  EditarEstadoRecorridoData,
} from "@/api/estado-recorrido/estado-recorrido.type";

export const getEstadosRecorrido = async () => {
  try {
    return await fetchApiWithAuth<EstadoRecorrido[]>("/estado-recorrido");
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los estados de recorrido";
    errorLogger(error, "[ESTADO_RECORRIDO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const createEstadoRecorrido = async (
  data: CreateEstadoRecorridoRequest,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      "/estado-recorrido",
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
        : "Error al crear el estado de recorrido";
    errorLogger(error, "[ESTADO_RECORRIDO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const editarEstadoRecorrido = async (
  id: number,
  data: EditarEstadoRecorridoData,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-recorrido/${id}`,
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
        : "Error al editar el estado de recorrido";
    errorLogger(error, "[ESTADO_RECORRIDO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const canDeleteEstadoRecorrido = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ canDelete: boolean }>(
      `/estado-recorrido/${id}/can-delete`,
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al verificar si se puede eliminar el estado de recorrido";
    errorLogger(error, "[ESTADO_RECORRIDO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoRecorrido = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-recorrido/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de recorrido";
    errorLogger(error, "[ESTADO_RECORRIDO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
