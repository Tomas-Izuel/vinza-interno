import { getEstadosRecorrido } from "@/api/estado-recorrido/estado-recorrido.service";
import { ListaEstadoRecorrido } from "@/components/estado-recorrido/ListaEstadoRecorrido";
import { NewEstadoRecorrido } from "@/components/estado-recorrido/NewEstadoRecorrido";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Estados de recorrido",
  description: "Gestión de estados de recorrido",
};

export const dynamic = "force-dynamic";

export default async function EstadoRecorridoPage() {
  const estadosRecorrido = await getEstadosRecorrido();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estados de recorrido</h1>
        <NewEstadoRecorrido />
      </header>
      <main>
        <ListaEstadoRecorrido estadosRecorrido={estadosRecorrido} />
      </main>
    </>
  );
}
