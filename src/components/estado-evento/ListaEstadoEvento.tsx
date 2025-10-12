"use client";

import { EstadoEvento } from "@/api/estado-evento/estado-evento.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { EditarEstadoEvento } from "./EditarEstadoEvento";
import { EliminarEstadoEvento } from "./EliminarEstadoEvento";

interface ListaEstadoEventoProps {
  estadosEvento: EstadoEvento[];
}

export function ListaEstadoEvento({ estadosEvento }: ListaEstadoEventoProps) {
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
          {estadosEvento.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell className="font-medium">{estado.nombre}</TableCell>
              <TableCell className="text-gray-600">
                {estado.descripcion || "-"}
              </TableCell>
              <TableCell>
                {moment(estado.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <EditarEstadoEvento estadoEvento={estado} />
                <EliminarEstadoEvento estadoEvento={estado} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
