"use server";

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
    console.error("[ESTADOS_INSTANCIA_EVENTO]: ", error);
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
    console.error("[ESTADOS_INSTANCIA_EVENTO]: ", error);
    throw new Error(errorMessage);
  }
};

export const editarEstadoInstanciaEvento = async (
  id: number,
  data: EditarEstadoInstanciaEventoData,
) => {
  try {
    const response = await fetchApiWithAuth<EstadoInstanciaEvento>(
      `/estado-instancia-eventos/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al editar el estado de instancia evento";
    console.error("[ESTADOS_INSTANCIA_EVENTO]: ", error);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoInstanciaEvento = async (id: number) => {
  try {
    await fetchApiWithAuth(`/estado-instancia-eventos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de instancia evento";
    console.error("[ESTADOS_INSTANCIA_EVENTO]: ", error);
    throw new Error(errorMessage);
  }
};
