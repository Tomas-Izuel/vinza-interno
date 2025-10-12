import { getBodegaById } from "@/api/bodegas/bodega.service";
import DetalleBodega from "@/components/bodega/DetalleBodega";
import BackButton from "@/components/common/BackButton";
import InlineErrorHandler from "@/components/common/InlineErrorHandler";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BodegaDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const bodega = await getBodegaById(Number(id));

    return (
      <div className="p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/bodegas">Bodegas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{bodega.nombre}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold">{bodega.nombre}</h1>
        </div>

        <DetalleBodega bodega={bodega} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/bodegas">Bodegas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detalle</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold">Detalle de Bodega</h1>
        </div>

        <InlineErrorHandler
          error={
            error instanceof Error
              ? error.message
              : "Error al cargar los detalles de la bodega"
          }
        />
      </div>
    );
  }
}
