"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategoriaEvento } from "@/api/categoria-evento/categoria-evento.service";
import {
  createCategoriaEventoSchema,
  CreateCategoriaEventoRequest,
} from "@/api/categoria-evento/categoria-evento.type";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";

export function NewCategoriaEvento() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateCategoriaEventoRequest>({
    resolver: zodResolver(createCategoriaEventoSchema),
    defaultValues: {
      nombre: "",
    },
  });

  const onSubmit = async (data: CreateCategoriaEventoRequest) => {
    try {
      setIsSubmitting(true);
      await createCategoriaEvento(data);
      toast.success("Ha sido creado exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the new categoria
      window.location.reload();
    } catch {
      toast.error("Error al crear la categoría");
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
            Crear categoría
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva categoría</DialogTitle>
            <DialogDescription>
              Completa los campos obligatorios para crear una nueva categoría de
              evento.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la categoría *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa el nombre de la categoría"
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
                  {isSubmitting ? "Creando..." : "Crear categoría"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AuthzGuard>
  );
}
