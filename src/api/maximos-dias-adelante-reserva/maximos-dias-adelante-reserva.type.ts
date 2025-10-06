import { z } from "zod";

export const createMaximosDiasAdelanteReservaSchema = z.object({
  valor: z.coerce.number().int().positive(),
});

export type MaximosDiasAdelanteReservaRequest = z.infer<
  typeof createMaximosDiasAdelanteReservaSchema
>;

export type MaximosDiasAdelanteReservaResponse = {
  valor: number;
};
