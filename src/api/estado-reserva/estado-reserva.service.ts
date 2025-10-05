"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  CrearEstadoReservaData,
  EditarEstadoReservaData,
  EstadoReservaResponse,
} from "./estado-reserva.type";

export const getEstadosReserva = async () => {
  try {
    const response =
      await fetchApiWithAuth<EstadoReservaResponse>("/estado-reservas");
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los estados de reserva";
    errorLogger(error, "[ESTADO_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const crearEstadoReserva = async (data: CrearEstadoReservaData) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      "/estado-reservas",
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
        : "Error al crear el estado de reserva";
    errorLogger(error, "[ESTADO_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const editarEstadoReserva = async (
  id: number,
  data: EditarEstadoReservaData,
) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-reservas/${id}`,
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
        : "Error al editar el estado de reserva";
    errorLogger(error, "[ESTADO_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const canDeleteEstadoReserva = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ canDelete: boolean }>(
      `/estado-reservas/${id}/can-delete`,
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al verificar si se puede eliminar el estado de reserva";
    errorLogger(error, "[ESTADO_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoReserva = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/estado-reservas/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de reserva";
    errorLogger(error, "[ESTADO_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
