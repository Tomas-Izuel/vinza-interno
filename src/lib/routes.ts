import z from "zod";

export enum Routes {
  BODEGAS = "/",
  LOGIN = "/iniciar-sesion",
  LOGOUT = "/cerrar-sesion",
  PERMISOS = "/permisos",
  ESTADO_RESERVA = "/estado-reserva",
  ESTADO_RESERVA_CREAR = "/estado-reserva/crear",
  AJUSTES = "/ajustes",
  ESTADO_INSTANCIA_EVENTO = "/estado-instancia-evento",
  ESTADO_INSTANCIA_EVENTO_CREAR = "/estado-instancia-evento/crear",
  CATEGORIA_EVENTO = "/categoria-evento",
  CATEGORIA_EVENTO_CREAR = "/categoria-evento/crear",
  ESTADO_EVENTO = "/estados-evento",
  ESTADO_EVENTO_CREAR = "/estados-evento/crear",
  ESTADO_RECORRIDO = "/estado-recorrido",
  ESTADO_RECORRIDO_CREAR = "/estado-recorrido/crear",
  AUDITORIA = "/auditoria",
}

export const RouteSchema = z.nativeEnum(Routes);
