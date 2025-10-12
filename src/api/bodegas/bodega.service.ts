"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  BodegaResponse,
  BodegasResponse,
  ValidateBodegaRequest,
  ValidateBodegaResponse,
} from "./bodega.type";

export const getBodegas = async () => {
  try {
    return fetchApiWithAuth<BodegasResponse>("/bodegas");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener las bodegas";
    errorLogger(error, "getBodegas");
    throw new Error(errorMessage);
  }
};

export const getBodegaById = async (id: number) => {
  try {
    return fetchApiWithAuth<BodegaResponse>(`/bodegas/${id}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener la bodega";
    errorLogger(error, "[BODEGAS]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const validateBodega = async (
  id: number,
  data: ValidateBodegaRequest,
) => {
  try {
    const response = await fetchApiWithAuth<ValidateBodegaResponse>(
      `/bodegas/${id}/validate`,
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
      error instanceof Error ? error.message : "Error al validar la bodega";
    errorLogger(error, "[BODEGAS]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
