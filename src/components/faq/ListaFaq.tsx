"use client";

import { Faq } from "@/api/faq/faq.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { EditarFaq } from "./EditarFaq";
import { EliminarFaq } from "./EliminarFaq";
import { FaqDetailModal } from "./FaqDetailModal";

interface ListaFaqProps {
  faqs: Faq[];
}

export function ListaFaq({ faqs }: ListaFaqProps) {
  return (
    <section className="bg-white border">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Pregunta</TableHead>
            <TableHead>Destinatario</TableHead>
            <TableHead>Última modificación</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell className="font-medium">
                <div className="max-w-xs truncate" title={faq.question}>
                  {faq.question}
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {faq.recipient.label}
                </span>
              </TableCell>
              <TableCell>
                {moment(faq.updated_at).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <FaqDetailModal faq={faq} />
                <EditarFaq faq={faq} />
                <EliminarFaq faq={faq} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
