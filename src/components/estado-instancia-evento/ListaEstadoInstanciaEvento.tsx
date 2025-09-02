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
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";

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
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estadosInstanciaEvento.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell className="font-medium">{estado.nombre}</TableCell>
              <TableCell>
                {moment(estado.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 mr-2"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4 mr-1" />
                  Borrar
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
  );
}
