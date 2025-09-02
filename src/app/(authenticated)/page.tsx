import { getBodegas } from "@/api/bodegas/bodega.service";
import { ListaBodega } from "@/components/bodega/ListaBodega";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vinza - Bodegas",
  description: "Lista de bodegas registradas",
};

const BodegasPage = async () => {
  const bodegas = await getBodegas();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bodegas</h1>
      </header>
      <main>
        <ListaBodega bodegas={bodegas.items} meta={bodegas.meta} />
      </main>
    </>
  );
};

export default BodegasPage;
