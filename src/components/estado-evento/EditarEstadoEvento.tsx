"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editarEstadoEvento } from "@/api/estado-evento/estado-evento.service";
import {
  updateEstadoEventoSchema,
  EditarEstadoEventoData,
  EstadoEvento,
} from "@/api/estado-evento/estado-evento.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useState } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";

interface EditarEstadoEventoProps {
  estadoEvento: EstadoEvento;
}

export function EditarEstadoEvento({ estadoEvento }: EditarEstadoEventoProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditarEstadoEventoData>({
    resolver: zodResolver(updateEstadoEventoSchema),
    defaultValues: {
      nombre: estadoEvento.nombre,
    },
  });

  const onSubmit = async (data: EditarEstadoEventoData) => {
    try {
      await editarEstadoEvento(estadoEvento.id, data);
      toast.success("Ha sido editado exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the updated estado evento
      window.location.reload();
    } catch (error) {
      toast.error("Error al actualizar el estado de evento", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <AuthzGuard permissions={[Permissions.SUDO]}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar estado de evento</DialogTitle>
            <DialogDescription>
              Modifica el nombre del estado de evento seleccionado.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del estado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa el nombre del estado"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "Guardando..."
                    : "Guardar cambios"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AuthzGuard>
  );
}
