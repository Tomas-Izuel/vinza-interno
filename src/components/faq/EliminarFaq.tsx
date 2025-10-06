"use client";

import { toast } from "sonner";
import { deleteFaq } from "@/api/faq/faq.service";
import { Faq } from "@/api/faq/faq.type";
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
import { Trash } from "lucide-react";
import { useState } from "react";
import { AuthzGuard } from "../auth/AuthzGuard";
import { Permissions } from "@/api/auth/auth.type";

interface EliminarFaqProps {
  faq: Faq;
}

export function EliminarFaq({ faq }: EliminarFaqProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteFaq(faq.id);
      toast.success("Pregunta frecuente eliminada exitosamente");
      setOpen(false);
      // Refresh the page to show the updated list
      window.location.reload();
    } catch (error) {
      toast.error("Error al eliminar la pregunta frecuente", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AuthzGuard permissions={[Permissions.FAQ_MANAGE]}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-red-500">
            <Trash className="w-4 h-4 mr-1" />
            Eliminar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eliminar pregunta frecuente</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas eliminar esta pregunta frecuente?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-gray-600">
              Esta acción no se puede revertir.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthzGuard>
  );
}
