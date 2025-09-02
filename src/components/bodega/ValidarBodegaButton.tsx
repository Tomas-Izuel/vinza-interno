"use client";

import { useState } from "react";
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
import { CheckCircle, PenBox, MapPin, Phone } from "lucide-react";
import { Bodega } from "@/api/bodegas/bodega.type";
import { validateBodega } from "@/api/bodegas/bodega.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ValidarBodegaButtonProps {
  bodega: Bodega;
}

export function ValidarBodegaButton({ bodega }: ValidarBodegaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleValidar = async () => {
    setIsLoading(true);
    try {
      await validateBodega(bodega.id, { es_valida: true });
      toast.success("Bodega validada exitosamente");
      setIsOpen(false);
      router.refresh(); // Refresca la página para mostrar los cambios
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al validar la bodega",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // No mostrar el botón si la bodega ya está validada
  if (bodega.validada) {
    return <span className="text-gray-700">Ninguna acción necesaria</span>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PenBox className="w-4 h-4 mr-2" />
          Validar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Validar Bodega
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas validar esta bodega? Al validar a la
            bodega se le habilitará para crear eventos y que los usuarios puedan
            reservar.
          </DialogDescription>
        </DialogHeader>

        {/* Información de la bodega */}
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-gray-900">
              Información de la bodega:
            </h4>

            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Nombre:</span>
                <p className="text-gray-900">{bodega.nombre}</p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700">Dirección:</span>
                  <p className="text-gray-900">{bodega.direccion}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-medium text-gray-700">Teléfono:</span>
                  <p className="text-gray-900">{bodega.telefono}</p>
                </div>
              </div>

              {bodega.descripcion && (
                <div>
                  <span className="font-medium text-gray-700">
                    Descripción:
                  </span>
                  <p className="text-gray-900">{bodega.descripcion}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleValidar} disabled={isLoading}>
            {isLoading ? "Validando..." : "Confirmar Validación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
