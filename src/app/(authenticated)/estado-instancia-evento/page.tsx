import { getEstadosInstanciaEvento } from "@/api/estado-instancia-evento/estado-instancia-evento.service";
import { ListaEstadoInstanciaEvento } from "@/components/estado-instancia-evento/ListaEstadoInstanciaEvento";
import { NewEstadoInstanciaEvento } from "@/components/estado-instancia-evento/NewEstadoInstanciaEvento";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Estados de instancia evento",
  description: "Gestión de estados de instancia evento",
};

export const dynamic = "force-dynamic";

export default async function EstadoInstanciaEventoPage() {
  const estadosInstanciaEvento = await getEstadosInstanciaEvento();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estados de instancia evento</h1>
        <NewEstadoInstanciaEvento />
      </header>
      <main>
        <ListaEstadoInstanciaEvento
          estadosInstanciaEvento={estadosInstanciaEvento.items}
          meta={estadosInstanciaEvento.meta}
        />
      </main>
    </>
  );
}
