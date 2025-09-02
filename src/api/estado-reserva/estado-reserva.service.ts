"use server";

import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadoReservaResponse,
  CrearEstadoReservaData,
  EditarEstadoReservaData,
  EstadoReserva,
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
    console.error("[ESTADOS_RESERVA]: ", error);
    throw new Error(errorMessage);
  }
};

export const crearEstadoReserva = async (data: CrearEstadoReservaData) => {
  try {
    const response = await fetchApiWithAuth<EstadoReserva>("/estado-reservas", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear el estado de reserva";
    console.error("[ESTADOS_RESERVA]: ", error);
    throw new Error(errorMessage);
  }
};

export const editarEstadoReserva = async (
  id: number,
  data: EditarEstadoReservaData,
) => {
  try {
    const response = await fetchApiWithAuth<EstadoReserva>(
      `/estado-reservas/${id}`,
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
        : "Error al editar el estado de reserva";
    console.error("[ESTADOS_RESERVA]: ", error);
    throw new Error(errorMessage);
  }
};

export const eliminarEstadoReserva = async (id: number) => {
  try {
    await fetchApiWithAuth(`/estado-reservas/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar el estado de reserva";
    console.error("[ESTADOS_RESERVA]: ", error);
    throw new Error(errorMessage);
  }
};
