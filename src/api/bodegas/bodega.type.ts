import { Meta } from "../common.type";

export type Bodega = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  validada: boolean;
  descripcion: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sucursales: Sucursal[];
};

export type Sucursal = {
  id: number;
  nombre: string;
  es_principal: boolean;
  direccion: string;
  aclaraciones: string;
  bodegaId: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type BodegasResponse = {
  items: Bodega[];
  meta: Meta;
};

export type ValidateBodegaRequest = {
  es_valida: boolean;
};

export type ValidateBodegaResponse = {
  message: string;
  bodega: Bodega;
};
