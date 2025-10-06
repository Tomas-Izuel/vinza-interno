"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateFaq, getFaqRecipients } from "@/api/faq/faq.service";
import {
  updateFaqSchema,
  UpdateFaqRequest,
  Faq,
  FaqRecipient,
} from "@/api/faq/faq.type";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";

interface EditarFaqProps {
  faq: Faq;
}

export function EditarFaq({ faq }: EditarFaqProps) {
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState<FaqRecipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);

  const form = useForm<UpdateFaqRequest>({
    resolver: zodResolver(updateFaqSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
      recipient_id: faq.recipient_id,
    },
  });

  const loadRecipients = async () => {
    try {
      setLoadingRecipients(true);
      const data = await getFaqRecipients();
      setRecipients(data);
    } catch (error) {
      toast.error("Error al cargar los destinatarios", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setLoadingRecipients(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadRecipients();
    }
  }, [open]);

  const onSubmit = async (data: UpdateFaqRequest) => {
    try {
      await updateFaq(faq.id, data);
      toast.success("Pregunta frecuente actualizada exitosamente");
      form.reset();
      setOpen(false);
      // Refresh the page to show the updated FAQ
      window.location.reload();
    } catch (error) {
      toast.error("Error al actualizar la pregunta frecuente", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <AuthzGuard permissions={[Permissions.FAQ_MANAGE]}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar pregunta frecuente</DialogTitle>
            <DialogDescription>
              Modifica la pregunta frecuente seleccionada.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pregunta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa la pregunta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respuesta</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingresa la respuesta"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinatario</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                      disabled={loadingRecipients}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un destinatario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recipients.map((recipient) => (
                          <SelectItem
                            key={recipient.id}
                            value={recipient.id.toString()}
                          >
                            {recipient.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
