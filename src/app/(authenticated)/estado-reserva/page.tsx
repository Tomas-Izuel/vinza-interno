import { getEstadosReserva } from "@/api/estado-reserva/estado-reserva.service";
import { ListaEstadoReserva } from "@/components/estado-reserva/ListaEstadoReserva";
import { NewEstadoReserva } from "@/components/estado-reserva/NewEstadoReserva";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Estados de reserva",
  description: "Gestión de estados de reserva",
};

export const dynamic = "force-dynamic";

export default async function EstadoReservaPage() {
  const estadosReserva = await getEstadosReserva();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estados de reserva</h1>
        <NewEstadoReserva />
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
