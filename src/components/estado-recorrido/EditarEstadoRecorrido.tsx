"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editarEstadoRecorrido } from "@/api/estado-recorrido/estado-recorrido.service";
import {
  updateEstadoRecorridoSchema,
  EditarEstadoRecorridoData,
  EstadoRecorrido,
} from "@/api/estado-recorrido/estado-recorrido.type";
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

interface EditarEstadoRecorridoProps {
  estadoRecorrido: EstadoRecorrido;
}

export function EditarEstadoRecorrido({
  estadoRecorrido,
}: EditarEstadoRecorridoProps) {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EditarEstadoRecorridoData>({
    resolver: zodResolver(updateEstadoRecorridoSchema),
    defaultValues: {
      nombre: estadoRecorrido.nombre,
      descripcion: estadoRecorrido.descripcion || "",
    },
  });

  const onSubmit = async (data: EditarEstadoRecorridoData) => {
    try {
      await editarEstadoRecorrido(estadoRecorrido.id, data);
      toast.success("Ha sido editado exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the updated estado recorrido
      refresh();
    } catch (error) {
      toast.error("Error al actualizar el estado de recorrido", {
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
            <DialogTitle>Editar estado de recorrido</DialogTitle>
            <DialogDescription>
              Modifica el nombre y descripción del estado de recorrido
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
