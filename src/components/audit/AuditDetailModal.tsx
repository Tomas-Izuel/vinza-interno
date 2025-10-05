"use client";

import { Audit } from "@/api/audit/audit.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import moment from "moment";

interface AuditDetailModalProps {
  audit: Audit;
  isOpen: boolean;
  onClose: () => void;
}

export function AuditDetailModal({
  audit,
  isOpen,
  onClose,
}: AuditDetailModalProps) {
  const getEventTypeLabel = (tipoEvento: string) => {
    const [model, event] = tipoEvento.split(":");
    const eventLabels = {
      create: "Crear",
      update: "Actualizar",
      delete: "Eliminar",
    };
    const modelLabels = {
      user: "Usuario",
      role: "Rol",
      permission: "Permiso",
      bodega: "Bodega",
      sucursal: "Sucursal",
      evento: "Evento",
      "maximos-dias-adelante-reserva": "Máximos días adelante reserva",
      recorrido: "Recorrido",
      reserva: "Reserva",
      "faq-recipient": "Destinatario FAQ",
      faq: "FAQ",
    };

    return `${modelLabels[model as keyof typeof modelLabels] || model} - ${eventLabels[event as keyof typeof eventLabels] || event}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Detalles de Auditoría
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p className="text-sm">{audit.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tipo de Evento
              </label>
              <p className="text-sm">{getEventTypeLabel(audit.tipoEvento)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Usuario
              </label>
              <p className="text-sm">
                {audit.user
                  ? `${audit.user.nombre} ${audit.user.apellido}`
                  : "Sistema"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Email del Usuario
              </label>
              <p className="text-sm">{audit.user?.email || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Fecha de Creación
              </label>
              <p className="text-sm">
                {moment(audit.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Fecha de Eliminación
              </label>
              <p className="text-sm">
                {audit.deletedAt
                  ? moment(audit.deletedAt).format("DD/MM/YYYY HH:mm:ss")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Datos del evento */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Datos del Evento
            </label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(audit.valor, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
