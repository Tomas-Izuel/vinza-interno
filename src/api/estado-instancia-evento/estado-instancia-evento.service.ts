"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadoInstanciaEventoResponse,
  CrearEstadoInstanciaEventoData,
  EditarEstadoInstanciaEventoData,
  EstadoInstanciaEvento,
} from "./estado-instancia-evento.type";

export const getEstadosInstanciaEvento = async () => {
  try {
    const response = await fetchApiWithAuth<EstadoInstanciaEventoResponse>(
      "/estado-instancia-eventos",
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los estados de instancia evento";
    errorLogger(error, "[ESTADO_INSTANCIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const crearEstadoInstanciaEvento = async (
  data: CrearEstadoInstanciaEventoData,
) => {
  try {
    const response = await fetchApiWithAuth<EstadoInstanciaEvento>(
      "/estado-instancia-eventos",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear el estado de instancia evento";
    errorLogger(error, "[ESTADO_INSTANCIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const editarEstadoInstanciaEvento = async (
  id: number,
  data: EditarEstadoInstanciaEventoData,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-instancia-eventos/${id}`,
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
        : "Error al editar el estado de instancia evento";
    errorLogger(error, "[ESTADO_INSTANCIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const canDeleteEstadoInstanciaEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ canDelete: boolean }>(
      `/estado-instancia-eventos/${id}/can-delete`,
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al verificar si se puede eliminar el estado de instancia evento";
    errorLogger(error, "[ESTADO_INSTANCIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoInstanciaEvento = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-instancia-eventos/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de instancia evento";
    errorLogger(error, "[ESTADO_INSTANCIA_EVENTO]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
