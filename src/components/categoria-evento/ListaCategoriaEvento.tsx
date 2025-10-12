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
import moment from "moment";
import { EditarCategoriaEvento } from "./EditarCategoriaEvento";
import { EliminarCategoriaEvento } from "./EliminarCategoriaEvento";

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
            <TableHead>Descripción</TableHead>
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriasEvento.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell className="font-medium">{categoria.nombre}</TableCell>
              <TableCell className="text-gray-600">
                {categoria.descripcion || "-"}
              </TableCell>
              <TableCell>
                {moment(categoria.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <EditarCategoriaEvento categoriaEvento={categoria} />
                <EliminarCategoriaEvento categoriaEvento={categoria} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
