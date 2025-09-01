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
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, MapPin, PenBox } from "lucide-react";
import Link from "next/link";

interface ListaBodegaProps {
    bodegas: Bodega[];
    meta: Meta;
}

export function ListaBodega({ bodegas, meta }: ListaBodegaProps) {
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
                                <Link href={`/bodegas/${bodega.id}`}>{bodega.direccion}
                                    <MapPin className="w-4 h-4 text-red-500" /></Link>
                            </TableCell>
                            <TableCell>
                                {moment(bodega.created_at).format("MMM D, YYYY")}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={bodega.deleted_at ? "destructive" : "default"}
                                    className={bodega.deleted_at ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {bodega.validada ? "Validada" : "Pendiente"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" className="text-primary">
                                    <PenBox className="w-4 h-4" />
                                    Validar
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
