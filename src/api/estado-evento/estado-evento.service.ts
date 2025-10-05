"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadosEventoResponse,
  CreateEstadoEventoRequest,
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
