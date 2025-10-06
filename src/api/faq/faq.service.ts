"use server";

import { errorLogger } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import {
  Faq,
  FaqRecipient,
  CreateFaqRequest,
  UpdateFaqRequest,
  FaqResponse,
} from "@/api/faq/faq.type";

export const getFaqs = async () => {
  try {
    const response = await fetchApiWithAuth<FaqResponse>(
      "/faqs?orderBy=created_at:desc",
    );
    return response.items;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener las preguntas frecuentes";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const getFaqRecipients = async () => {
  try {
    return await fetchApiWithAuth<FaqRecipient[]>("/faqs/recipients");
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los destinatarios de FAQ";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const getFaqById = async (id: number) => {
  try {
    return await fetchApiWithAuth<Faq>(`/faqs/${id}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener la pregunta frecuente";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const createFaq = async (data: CreateFaqRequest) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>("/faqs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al crear la pregunta frecuente";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateFaq = async (id: number, data: UpdateFaqRequest) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/faqs/${id}`,
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
        : "Error al actualizar la pregunta frecuente";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteFaq = async (id: number) => {
  try {
    const response = await fetchApiWithAuth<{ message: string }>(
      `/faqs/${id}`,
      {
        method: "DELETE",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al eliminar la pregunta frecuente";
    errorLogger(error, "[FAQ]: " + errorMessage);
    throw new Error(errorMessage);
  }
};
