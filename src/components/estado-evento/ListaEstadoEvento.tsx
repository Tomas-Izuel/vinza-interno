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
import { Edit, Trash } from "lucide-react";
import moment from "moment";
import { Button } from "../ui/button";

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
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estadosEvento.map((estado) => (
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
                  Editar
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
