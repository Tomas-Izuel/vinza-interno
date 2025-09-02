"use client";

import { Bodega } from "@/api/bodegas/bodega.type";
import { Meta } from "@/api/common.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommonTableFooter } from "../common/CommonTableFooter";
import moment from "moment";
import { Badge } from "../ui/badge";
import { CheckCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { ValidarBodegaButton } from "./ValidarBodegaButton";

interface ListaBodegaProps {
  bodegas: Bodega[];
  meta: Meta;
}

export function ListaBodega({ bodegas, meta }: ListaBodegaProps) {
  const renderBadgeStatus = (bodega: Bodega) => {
    if (bodega.deleted_at) {
      return <Badge variant="destructive">Eliminada</Badge>;
    }
    return <Badge variant="default">Activa</Badge>;
  };

  return (
    <section className="bg-white border">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Validación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodegas.map((bodega) => (
            <TableRow key={bodega.id}>
              <TableCell className="font-medium flex items-center gap-2">
                {bodega.nombre}
              </TableCell>
              <TableCell>{bodega.telefono}</TableCell>
              <TableCell>
                <Link href={`/bodegas/${bodega.id}`}>
                  {bodega.direccion}
                  <MapPin className="w-4 h-4 text-red-500" />
                </Link>
              </TableCell>
              <TableCell>
                {moment(bodega.created_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell>{renderBadgeStatus(bodega)}</TableCell>
              <TableCell>
                <ValidarBodegaButton bodega={bodega} />
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
  );
}
