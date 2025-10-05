"use client";

import { CategoriaEvento } from "@/api/categoria-evento/categoria-evento.type";
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

interface ListaCategoriaEventoProps {
  categoriasEvento: CategoriaEvento[];
}

export function ListaCategoriaEvento({
  categoriasEvento,
}: ListaCategoriaEventoProps) {
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
          {categoriasEvento.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell className="font-medium">{categoria.nombre}</TableCell>
              <TableCell>
                {moment(categoria.updated_at).format("MMM D, YYYY")}
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
