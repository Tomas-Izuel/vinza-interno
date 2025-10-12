"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { crearEstadoReserva } from "@/api/estado-reserva/estado-reserva.service";
import {
  CrearEstadoReservaSchema,
  CrearEstadoReservaData,
} from "@/api/estado-reserva/estado-reserva.type";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";
import { useRouter } from "next/navigation";

export function NewEstadoReserva() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CrearEstadoReservaData>({
    resolver: zodResolver(CrearEstadoReservaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  const onSubmit = async (data: CrearEstadoReservaData) => {
    try {
      setIsSubmitting(true);
      await crearEstadoReserva(data);
      toast.success("Ha sido creado exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the new estado reserva
      refresh();
    } catch (error) {
      toast.error("Error al crear el estado de reserva", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSubmitting(false);
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Crear estado
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nuevo estado de reserva</DialogTitle>
            <DialogDescription>
              Completa los campos obligatorios para crear un nuevo estado de
              reserva.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del estado *</FormLabel>
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
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creando..." : "Crear estado"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AuthzGuard>
  );
}
