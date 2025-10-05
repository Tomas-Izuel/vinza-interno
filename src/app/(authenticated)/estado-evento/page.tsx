import { getEstadosEvento } from "@/api/estado-evento/estado-evento.service";
import { ListaEstadoEvento } from "@/components/estado-evento/ListaEstadoEvento";
import { NewEstadoEvento } from "@/components/estado-evento/NewEstadoEvento";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Estados de evento",
  description: "Gestión de estados de evento",
};

export const dynamic = "force-dynamic";

export default async function EstadoEventoPage() {
  const response = await getEstadosEvento();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estados de evento</h1>
        <NewEstadoEvento />
      </header>
      <main>
        <ListaEstadoEvento estadosEvento={response.items} />
      </main>
    </>
  );
}
