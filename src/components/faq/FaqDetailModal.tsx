"use client";

import { Faq } from "@/api/faq/faq.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

interface FaqDetailModalProps {
  faq: Faq;
}

export function FaqDetailModal({ faq }: FaqDetailModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-blue-600">
          <Eye className="w-4 h-4 mr-1" />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle de la pregunta frecuente</DialogTitle>
          <DialogDescription>
            Información completa de la pregunta frecuente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">
              Pregunta:
            </h4>
            <p className="text-gray-900">{faq.question}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">
              Respuesta:
            </h4>
            <p className="text-gray-900 whitespace-pre-wrap">{faq.answer}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">
              Destinatario:
            </h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {faq.recipient.label}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
