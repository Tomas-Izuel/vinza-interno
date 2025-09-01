"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import { BodegasResponse } from "./bodega.type";

export const getBodegas = async () => {
  try {
    const response = await fetchApiWithAuth<BodegasResponse>("/bodegas");
    console.log(response);
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener las bodegas";
    errorLogger(error, "getBodegas");
    throw new Error(errorMessage);
  }
};
