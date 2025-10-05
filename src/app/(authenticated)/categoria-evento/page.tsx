import { getCategorias } from "@/api/categoria-evento/categoria-evento.service";
import { ListaCategoriaEvento } from "@/components/categoria-evento/ListaCategoriaEvento";
import { NewCategoriaEvento } from "@/components/categoria-evento/NewCategoriaEvento";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Estados de instancia evento",
  description: "Gestión de estados de instancia evento",
};

export const dynamic = "force-dynamic";

export default async function EstadoInstanciaEventoPage() {
  const categoriasEvento = await getCategorias();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías de evento</h1>
        <NewCategoriaEvento />
      </header>
      <main>
        <ListaCategoriaEvento categoriasEvento={categoriasEvento} />
      </main>
    </>
  );
}
