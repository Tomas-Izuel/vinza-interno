"use server";

import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  EstadoRecorrido,
  CreateEstadoRecorridoRequest,
} from "@/api/estado-recorrido/estado-recorrido.type";

export const getEstadosRecorrido = async () => {
  return fetchApiWithAuth<EstadoRecorrido[]>("/estado-recorrido");
};

export const createEstadoRecorrido = async (
  data: CreateEstadoRecorridoRequest,
) => {
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
};
