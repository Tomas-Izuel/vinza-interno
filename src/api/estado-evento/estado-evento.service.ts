"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadosEventoResponse,
  CreateEstadoEventoRequest,
  EditarEstadoEventoData,
} from "./estado-evento.type";

export const getEstadosEvento = async () => {
  try {
    return await fetchApiWithAuth<EstadosEventoResponse>("/estado-eventos");
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los estados de evento";
    errorLogger(error, "[ESTADO_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const createEstadoEvento = async (data: CreateEstadoEventoRequest) => {
  const response = await fetchApiWithAuth<{ message: string }>(
    "/estado-eventos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  return response;
};

export const editarEstadoEvento = async (
  id: number,
  data: EditarEstadoEventoData,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-eventos/${id}`,
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
        : "Error al editar el estado de evento";
    errorLogger(error, "[ESTADO_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const canDeleteEstadoEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ canDelete: boolean }>(
      `/estado-eventos/${id}/can-delete`,
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al verificar si se puede eliminar el estado de evento";
    errorLogger(error, "[ESTADO_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-eventos/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de evento";
    errorLogger(error, "[ESTADO_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
