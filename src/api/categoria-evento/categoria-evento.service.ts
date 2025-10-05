"use server";

import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  CategoriaEventoResponse,
  CreateCategoriaEventoRequest,
} from "./categoria-evento.type";

export const getCategorias = async () => {
  return fetchApiWithAuth<CategoriaEventoResponse>("/categoria-eventos");
};

export const createCategoriaEvento = async (
  data: CreateCategoriaEventoRequest,
) => {
  const response = await fetchApiWithAuth<{ message: string }>(
    "/categoria-eventos",
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
