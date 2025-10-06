"use client";

import { Permissions } from "@/api/auth/auth.type";
import { updateMaximosDiasAdelanteReserva } from "@/api/maximos-dias-adelante-reserva/maximos-dias-adelante-reserva.service";
import {
  createMaximosDiasAdelanteReservaSchema,
  MaximosDiasAdelanteReservaRequest,
  MaximosDiasAdelanteReservaResponse,
} from "@/api/maximos-dias-adelante-reserva/maximos-dias-adelante-reserva.type";
import { AuthzGuard } from "@/components/auth/AuthzGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MaximosDiasAdelanteReservaProps {
  initialData: MaximosDiasAdelanteReservaResponse;
}

export function MaximosDiasAdelanteReserva({
  initialData,
}: MaximosDiasAdelanteReservaProps) {
  const form = useForm<MaximosDiasAdelanteReservaRequest>({
    resolver: zodResolver(createMaximosDiasAdelanteReservaSchema),
    defaultValues: {
      valor: initialData.valor,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: MaximosDiasAdelanteReservaRequest) => {
    try {
      await updateMaximosDiasAdelanteReserva(data);
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      toast.error("Error al actualizar los datos", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiempo máximo reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de días</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese la cantidad de días"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthzGuard permissions={[Permissions.SUDO]}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="self-end"
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </AuthzGuard>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
