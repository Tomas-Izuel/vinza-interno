import { z } from "zod";

export enum AuditEvent {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum AuditModel {
  USER = "user",
  ROLE = "role",
  PERMISSION = "permission",
  BODEGA = "bodega",
  SUCURSAL = "sucursal",
  EVENTO = "evento",
  MAXIMOS_DIAS_ADELANTE_RESERVA = "maximos-dias-adelante-reserva",
  RECORRIDO = "recorrido",
  RESERVA = "reserva",
  FAQ_RECIPIENT = "faq-recipient",
  FAQ = "faq",
}

export type AuditEventType = `${AuditModel}:${AuditEvent}`;

export type User = {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
};

export type Audit = {
  id: number;
  valor: object;
  tipoEvento: AuditEventType;
  userId: number;
  user: User;
  createdAt: string;
  deletedAt: string | null;
};

export type AuditResponse = {
  items: Audit[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
};

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
