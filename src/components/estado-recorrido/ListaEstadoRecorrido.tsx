"use client";

import { EstadoRecorrido } from "@/api/estado-recorrido/estado-recorrido.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { EditarEstadoRecorrido } from "./EditarEstadoRecorrido";
import { EliminarEstadoRecorrido } from "./EliminarEstadoRecorrido";

interface ListaEstadoRecorridoProps {
  estadosRecorrido: EstadoRecorrido[];
}

export function ListaEstadoRecorrido({
  estadosRecorrido,
}: ListaEstadoRecorridoProps) {
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
          {estadosRecorrido.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell className="font-medium">{estado.nombre}</TableCell>
              <TableCell className="text-gray-600">
                {estado.descripcion || "-"}
              </TableCell>
              <TableCell>
                {moment(estado.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <EditarEstadoRecorrido estadoRecorrido={estado} />
                <EliminarEstadoRecorrido estadoRecorrido={estado} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
