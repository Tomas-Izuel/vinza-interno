"use client";

import { Permissions } from "@/api/auth/auth.type";
import {
  canDeleteCategoriaEvento,
  eliminarCategoriaEvento,
} from "@/api/categoria-evento/categoria-evento.service";
import { CategoriaEvento } from "@/api/categoria-evento/categoria-evento.type";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthzGuard } from "../auth/AuthzGuard";

interface EliminarCategoriaEventoProps {
  categoriaEvento: CategoriaEvento;
}

export function EliminarCategoriaEvento({
  categoriaEvento,
}: EliminarCategoriaEventoProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canDelete, setCanDelete] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen);

    if (newOpen) {
      // Check if can delete when opening the modal
      try {
        setIsChecking(true);
        const response = await canDeleteCategoriaEvento(categoriaEvento.id);
        setCanDelete(response.canDelete);
      } catch {
        setCanDelete(false);
      } finally {
        setIsChecking(false);
      }
    } else {
      // Reset state when closing
      setCanDelete(null);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await eliminarCategoriaEvento(categoriaEvento.id);
      toast.success("Ha sido eliminado exitosamente");
      setOpen(false);
      // Refresh the page to show the updated list
      window.location.reload();
    } catch {
      toast.error("Ha ocurrido un error, intente nuevamente");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AuthzGuard permissions={[Permissions.SUDO]}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-red-500">
            <Trash className="w-4 h-4 mr-1" />
            Eliminar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eliminar categoría de evento</DialogTitle>
          </DialogHeader>

          {isChecking ? (
            <div className="py-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : canDelete === false ? (
            <Alert className="mb-4">
              <AlertDescription>
                No se puede eliminar la categoría de evento, tiene eventos
                relacionados.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="py-4">
              <p className="text-sm text-gray-600">
                ¿Estás seguro que deseas continuar?
              </p>
              <p className="text-sm text-gray-600">
                Esta acción no se puede revertir.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            {canDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar categoría"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthzGuard>
  );
}
