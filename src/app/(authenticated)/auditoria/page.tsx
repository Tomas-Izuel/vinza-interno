import { getAudits } from "@/api/audit/audit.service";
import { ListaAudit } from "@/components/audit/ListaAudit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Auditoría",
  description: "Gestión de auditoría del sistema",
};

export const dynamic = "force-dynamic";

export default async function AuditoriaPage() {
  const audits = await getAudits();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Auditoría</h1>
      </header>
      <main>
        <ListaAudit audits={audits.items} meta={audits.meta} />
      </main>
    </>
  );
}
