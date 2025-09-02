import { getEstadosReserva } from "@/api/estado-reserva/estado-reserva.service";
import { ListaEstadoReserva } from "@/components/estado-reserva/ListaEstadoReserva";
import { Routes } from "@/lib/routes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vinza - Estados de reserva",
  description: "Gestión de estados de reserva",
};

export default async function EstadoReservaPage() {
  const estadosReserva = await getEstadosReserva();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estados de reserva</h1>
        <Link
          href={Routes.ESTADO_RESERVA_CREAR}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Crear estado
        </Link>
      </header>
      <main>
        <ListaEstadoReserva
          estadosReserva={estadosReserva.items}
          meta={estadosReserva.meta}
        />
      </main>
    </>
  );
}
