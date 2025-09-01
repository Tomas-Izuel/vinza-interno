import { getEstadosInstanciaEvento } from "@/api/estado-instancia-evento/estado-instancia-evento.service";
import { ListaEstadoInstanciaEvento } from "@/components/estado-instancia-evento/ListaEstadoInstanciaEvento";
import { Routes } from "@/lib/routes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Vinza - Estados de instancia evento",
    description: "Gestión de estados de instancia evento",
};

export default async function EstadoInstanciaEventoPage() {
    const estadosInstanciaEvento = await getEstadosInstanciaEvento();

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Estados de instancia evento</h1>
                <Link
                    href={Routes.ESTADO_INSTANCIA_EVENTO_CREAR}
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Crear estado instancia
                </Link>
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
