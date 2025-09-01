"use client";

import { Permiso } from "@/api/permisos/permiso.type";
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
import { Edit } from "lucide-react";

interface ListaPermisosProps {
    permisos: Permiso[];
    meta: Meta;
}

export function ListaPermisos({ permisos, meta }: ListaPermisosProps) {
    return (
        <section className="bg-white border">
            <Table>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha de creación</TableHead>
                        <TableHead>Última actualización</TableHead>
                        <TableHead> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permisos.map((permiso) => (
                        <TableRow key={permiso.id}>
                            <TableCell className="font-medium">
                                {permiso.nombre}
                            </TableCell>
                            <TableCell>
                                {moment(permiso.created_at).format("MMM D, YYYY")}
                            </TableCell>
                            <TableCell>
                                {moment(permiso.updated_at).format("MMM D, YYYY")}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-gray-600">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Editar
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
