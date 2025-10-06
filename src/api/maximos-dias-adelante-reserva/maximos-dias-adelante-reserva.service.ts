"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  MaximosDiasAdelanteReservaRequest,
  MaximosDiasAdelanteReservaResponse,
} from "./maximos-dias-adelante-reserva.type";

export const getMaximosDiasAdelanteReserva = async () => {
  try {
    return fetchApiWithAuth<MaximosDiasAdelanteReservaResponse>(
      "/maximos-dias-adelante-reserva",
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los días máximos de adelante para reserva";
    errorLogger(error, "[MAXIMOS_DIAS_ADELANTE_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateMaximosDiasAdelanteReserva = async (
  data: MaximosDiasAdelanteReservaRequest,
) => {
  try {
    const response = await fetchApiWithAuth<MaximosDiasAdelanteReservaResponse>(
      "/maximos-dias-adelante-reserva",
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
        : "Error al actualizar los días máximos de adelante para reserva";
    errorLogger(error, "[MAXIMOS_DIAS_ADELANTE_RESERVA]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
