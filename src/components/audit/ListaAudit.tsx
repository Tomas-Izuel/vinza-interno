"use client";

import { Audit } from "@/api/audit/audit.type";
import { Meta } from "@/api/common.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { CommonTableFooter } from "../common/CommonTableFooter";
import { Button } from "../ui/button";
import { AuditDetailModal } from "./AuditDetailModal";

interface ListaAuditProps {
  audits: Audit[];
  meta: Meta;
}

export function ListaAudit({ audits, meta }: ListaAuditProps) {
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (audit: Audit) => {
    setSelectedAudit(audit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAudit(null);
  };

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
    <>
      <section className="bg-white border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Tipo de Evento</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id} onClick={() => handleRowClick(audit)}>
                <TableCell className="font-medium">
                  {getEventTypeLabel(audit.tipoEvento)}
                </TableCell>
                <TableCell>
                  {audit.user
                    ? `${audit.user.nombre} ${audit.user.apellido}`
                    : "Sistema"}
                </TableCell>
                <TableCell>
                  {moment(audit.createdAt).format("MMM D, YYYY HH:mm")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(audit);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CommonTableFooter
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          totalItems={meta.totalItems}
          itemsPerPage={meta.itemsPerPage}
        />
      </section>

      {selectedAudit && (
        <AuditDetailModal
          audit={selectedAudit}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
