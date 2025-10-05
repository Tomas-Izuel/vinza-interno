import { MaximosDiasAdelanteReserva } from "@/components/ajustes/MaximosDiasAdelanteReserva";
import { BackupSection } from "@/components/ajustes/BackupSection";
import { getMaximosDiasAdelanteReserva } from "@/api/maximos-dias-adelante-reserva/maximos-dias-adelante-reserva.service";

export default async function AjustesPage() {
  const initialData = await getMaximosDiasAdelanteReserva();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ajustes</h1>

        <MaximosDiasAdelanteReserva initialData={initialData} />

        <BackupSection />
      </div>
    </div>
  );
}
