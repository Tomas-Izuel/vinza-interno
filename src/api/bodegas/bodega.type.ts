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
};

export type BodegasResponse = {
  items: Bodega[];
  meta: Meta;
};
