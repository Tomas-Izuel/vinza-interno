import { z } from "zod";

export const createMaximosDiasAdelanteReservaSchema = z.object({
  valor: z.coerce
    .number({
      message: "Debe ser un valor numérico",
    })
    .int("Debe ser un número entero")
    .positive("El parámetro debe ser mayor a 0"),
});

export type MaximosDiasAdelanteReservaRequest = z.infer<
  typeof createMaximosDiasAdelanteReservaSchema
>;

export type MaximosDiasAdelanteReservaResponse = {
  valor: number;
};
