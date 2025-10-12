"use client";

import { EstadoInstanciaEvento } from "@/api/estado-instancia-evento/estado-instancia-evento.type";
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
import { EditarEstadoInstanciaEvento } from "./EditarEstadoInstanciaEvento";
import { EliminarEstadoInstanciaEvento } from "./EliminarEstadoInstanciaEvento";

interface ListaEstadoInstanciaEventoProps {
  estadosInstanciaEvento: EstadoInstanciaEvento[];
  meta: Meta;
}

export function ListaEstadoInstanciaEvento({
  estadosInstanciaEvento,
  meta,
}: ListaEstadoInstanciaEventoProps) {
  return (
    <section className="bg-white border">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estadosInstanciaEvento.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell className="font-medium">{estado.nombre}</TableCell>
              <TableCell className="text-gray-600">
                {estado.descripcion || "-"}
              </TableCell>
              <TableCell>
                {moment(estado.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <EditarEstadoInstanciaEvento estadoInstanciaEvento={estado} />
                <EliminarEstadoInstanciaEvento estadoInstanciaEvento={estado} />
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
