import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent } from "../ui/card";
import { Routes } from "@/lib/routes";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { validateAuthCookie } from "@/lib/utils.server";

export default async function TopNav() {
  const data = await validateAuthCookie();

  return (
    <nav className="bg-gray-700 text-white px-6 py-2 flex items-center justify-between h-16">
      <div className="flex items-center">
        <h1 className="text-lg tracking-wider">
          <span className="font-inria-serif">VINZA </span>- Panel de
          administrador
        </h1>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center space-x-3 bg-gray-600 p-2">
            <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarFallback className="text-black">
                {data?.nombre.charAt(0)}
                {data?.apellido.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {data?.nombre} {data?.apellido}
              </p>
              <p className="text-xs text-gray-100 truncate">
                {data?.roles?.[0]?.nombre || "Sin rol"}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="end">
          <div className="py-0 pl-3 border-b border-gray-200">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-black text-sm">
                      {data?.nombre.charAt(0)}
                      {data?.apellido.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {data?.nombre} {data?.apellido}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {data?.roles?.[0]?.nombre || "Sin rol"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="py-1">
            <Link
              href={Routes.LOGOUT}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Cerrar sesión
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
