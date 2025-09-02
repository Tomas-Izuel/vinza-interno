import { getPermisos } from "@/api/permisos/permiso.service";
import { ListaPermisos } from "@/components/permisos/ListaPermisos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Permisos",
  description: "Gestión de permisos del sistema",
};

export const dynamic = "force-dynamic";

export default async function PermisosPage() {
  const permisos = await getPermisos();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Permisos</h1>
      </header>
      <main>
        <ListaPermisos
          permisos={permisos}
          meta={{
            currentPage: 1,
            totalPages: 1,
            totalItems: permisos.length,
            itemsPerPage: permisos.length,
          }}
        />
      </main>
    </>
  );
}
