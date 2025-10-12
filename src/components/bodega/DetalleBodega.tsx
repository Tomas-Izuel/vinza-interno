"use client";

import { Bodega } from "@/api/bodegas/bodega.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import moment from "moment";
import { ValidarBodegaButton } from "./ValidarBodegaButton";

interface DetalleBodegaProps {
  bodega: Bodega;
}

export default function DetalleBodega({ bodega }: DetalleBodegaProps) {
  const renderBadgeStatus = () => {
    if (bodega.deleted_at) {
      return <Badge variant="destructive">Eliminada</Badge>;
    }
    if (!bodega.validada) {
      return <Badge variant="default">No validada</Badge>;
    }
    return <Badge variant="default">Activa</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Información Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Información General</CardTitle>
            <div className="flex items-center gap-2">
              {renderBadgeStatus()}
              <ValidarBodegaButton bodega={bodega} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">Nombre</span>
              </div>
              <p className="text-base">{bodega.nombre}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span className="font-medium">Teléfono</span>
              </div>
              <p className="text-base">{bodega.telefono}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Dirección</span>
              </div>
              <p className="text-base">{bodega.direccion}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Fecha de creación</span>
              </div>
              <p className="text-base">
                {moment(bodega.created_at).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </div>

          {bodega.descripcion && (
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-medium">
                Descripción
              </div>
              <p className="text-base">{bodega.descripcion}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sucursales */}
      <Card>
        <CardHeader>
          <CardTitle>Sucursales ({bodega.sucursales.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {bodega.sucursales.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay sucursales registradas
            </p>
          ) : (
            <div className="space-y-4">
              {bodega.sucursales.map((sucursal) => (
                <div
                  key={sucursal.id}
                  className={`p-4 rounded-lg border ${
                    sucursal.es_principal
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {sucursal.nombre}
                        </h3>
                        {sucursal.es_principal && (
                          <Badge variant="default" className="text-xs">
                            Principal
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{sucursal.direccion}</span>
                      </div>

                      {sucursal.aclaraciones && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Aclaraciones: </span>
                          {sucursal.aclaraciones}
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        Creada el{" "}
                        {moment(sucursal.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    {sucursal.deleted_at ? (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        Eliminada
                      </Badge>
                    ) : (
                      <Badge
                        variant="default"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Activa
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fechas de Actualización y Eliminación */}
      {(bodega.updated_at !== bodega.created_at || bodega.deleted_at) && (
        <Card>
          <CardHeader>
            <CardTitle>Historial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {bodega.updated_at !== bodega.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Última actualización:{" "}
                  <span className="font-medium">
                    {moment(bodega.updated_at).format("DD/MM/YYYY HH:mm")}
                  </span>
                </span>
              </div>
            )}
            {bodega.deleted_at && (
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">
                  Fecha de eliminación:{" "}
                  <span className="font-medium text-red-600">
                    {moment(bodega.deleted_at).format("DD/MM/YYYY HH:mm")}
                  </span>
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
