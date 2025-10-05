"use client";

import { EstadoReserva } from "@/api/estado-reserva/estado-reserva.type";
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
import { EditarEstadoReserva } from "./EditarEstadoReserva";
import { EliminarEstadoReserva } from "./EliminarEstadoReserva";

interface ListaEstadoReservaProps {
  estadosReserva: EstadoReserva[];
  meta: Meta;
}

export function ListaEstadoReserva({
  estadosReserva,
  meta,
}: ListaEstadoReservaProps) {
  return (
    <section className="bg-white border">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estadosReserva.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell className="font-medium">{estado.nombre}</TableCell>
              <TableCell>
                {moment(estado.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <EditarEstadoReserva estadoReserva={estado} />
                <EliminarEstadoReserva estadoReserva={estado} />
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
