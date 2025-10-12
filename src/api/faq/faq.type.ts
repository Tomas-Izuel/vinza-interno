import { z } from "zod";

export enum FaqRecipientsEnum {
  VISITOR = "visitor",
  CLIENT = "client",
  ADMIN = "admin",
}

export type FaqRecipient = {
  id: number;
  name: FaqRecipientsEnum;
  label: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  recipient_id: number;
  recipient: FaqRecipient;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FaqResponse = {
  items: Faq[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
};

export const createFaqSchema = z.object({
  question: z.string().min(1, "La pregunta es obligatoria"),
  answer: z.string().min(1, "La respuesta es obligatoria"),
  recipient_id: z.coerce
    .number({ message: "Debe seleccionar un destinatario" })
    .int({ message: "Debe seleccionar un destinatario" })
    .positive("Debe seleccionar un destinatario"),
});

export const updateFaqSchema = createFaqSchema.partial();

export type CreateFaqRequest = z.infer<typeof createFaqSchema>;
export type UpdateFaqRequest = z.infer<typeof updateFaqSchema>;
