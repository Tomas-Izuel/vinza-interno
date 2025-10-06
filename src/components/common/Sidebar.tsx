"use client";
import Link from "next/link";
import {
  Home,
  FileText,
  Calendar,
  Settings,
  Shield,
  FolderOpen,
  History,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Routes, RouteSchema } from "@/lib/routes";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
  const path = usePathname();
  const activePage = RouteSchema.safeParse(path);

  return (
    <aside className="w-60 bg-[#FFFAF4] border-r border-gray-200 h-[calc(100vh-64px)]">
      <div className="p-4 space-y-1">
        {/* Panel - Active Item */}
        <Link href={Routes.BODEGAS}>
          <div
            className={cn(
              "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
              activePage.success && activePage.data === Routes.BODEGAS
                ? "bg-gray-100 text-primary"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <Home className="h-4 w-4 mr-3" />
            Bodegas
          </div>
        </Link>

        {/* Eventos Section */}
        <div className="pt-4">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Eventos
          </div>
          <div className="mt-1 space-y-1">
            <Link
              href={Routes.CATEGORIA_EVENTO}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success &&
                  activePage.data === Routes.CATEGORIA_EVENTO
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <FolderOpen className="h-4 w-4 mr-3" />
                Categorías de Evento
              </div>
            </Link>
            <Link
              href={Routes.ESTADO_EVENTO}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success && activePage.data === Routes.ESTADO_EVENTO
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <Calendar className="h-4 w-4 mr-3" />
                Estados de Evento
              </div>
            </Link>
            <Link
              href={Routes.ESTADO_INSTANCIA_EVENTO}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success &&
                  activePage.data === Routes.ESTADO_INSTANCIA_EVENTO
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <FileText className="h-4 w-4 mr-3" />
                Estados de Instancia
              </div>
            </Link>
          </div>
        </div>

        {/* Reservas Section */}
        <div className="pt-4">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reservas
          </div>
          <div className="mt-1 space-y-1">
            <Link
              href={Routes.ESTADO_RESERVA}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success && activePage.data === Routes.ESTADO_RESERVA
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <FileText className="h-4 w-4 mr-3" />
                Estados de Reserva
              </div>
            </Link>
            <Link
              href={Routes.ESTADO_RECORRIDO}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success &&
                  activePage.data === Routes.ESTADO_RECORRIDO
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <Calendar className="h-4 w-4 mr-3" />
                Estados de Recorrido
              </div>
            </Link>
          </div>
        </div>

        {/* Administración Section */}
        <div className="pt-4">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Administración
          </div>
          <div className="mt-1 space-y-1">
            <Link
              href={Routes.PERMISOS}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success && activePage.data === Routes.PERMISOS
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <Shield className="h-4 w-4 mr-3" />
                Permisos
              </div>
            </Link>
            <Link
              href={Routes.AJUSTES}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success && activePage.data === Routes.AJUSTES
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <Settings className="h-4 w-4 mr-3" />
                Ajustes
              </div>
            </Link>
            <Link
              href={Routes.AUDITORIA}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success && activePage.data === Routes.AUDITORIA
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <History className="h-4 w-4 mr-3" />
                Auditoría
              </div>
            </Link>
            <Link
              href={Routes.PREGUNTAS_FRECUENTES}
              className={cn(
                "flex items-center px-1 py-1 rounded-md text-sm font-medium cursor-pointer",
                activePage.success &&
                  activePage.data === Routes.PREGUNTAS_FRECUENTES
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-3" />
                Preguntas Frecuentes
              </div>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
