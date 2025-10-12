"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editarEstadoInstanciaEvento } from "@/api/estado-instancia-evento/estado-instancia-evento.service";
import {
  updateEstadoInstanciaEventoSchema,
  EditarEstadoInstanciaEventoData,
  EstadoInstanciaEvento,
} from "@/api/estado-instancia-evento/estado-instancia-evento.type";
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
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useState } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";
import { useRouter } from "next/navigation";

interface EditarEstadoInstanciaEventoProps {
  estadoInstanciaEvento: EstadoInstanciaEvento;
}

export function EditarEstadoInstanciaEvento({
  estadoInstanciaEvento,
}: EditarEstadoInstanciaEventoProps) {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EditarEstadoInstanciaEventoData>({
    resolver: zodResolver(updateEstadoInstanciaEventoSchema),
    defaultValues: {
      nombre: estadoInstanciaEvento.nombre,
      descripcion: estadoInstanciaEvento.descripcion || "",
    },
  });

  const onSubmit = async (data: EditarEstadoInstanciaEventoData) => {
    try {
      await editarEstadoInstanciaEvento(estadoInstanciaEvento.id, data);
      toast.success("Ha sido editado exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the updated estado instancia evento
      refresh();
    } catch (error) {
      toast.error("Error al actualizar el estado de instancia evento", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    form.reset();
  };

  return (
    <AuthzGuard permissions={[Permissions.SUDO]}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar estado de instancia evento</DialogTitle>
            <DialogDescription>
              Modifica el nombre y descripción del estado de instancia evento
              seleccionado.
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
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingresa una descripción (opcional)"
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
