"use server";

import { errorLogger } from "@/lib/utils";
import {
  AuthCookieSchema,
  LoginDto,
  LoginResponse,
  Permissions,
} from "./auth.type";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { fetchApi, fetchApiWithAuth } from "@/lib/utils.server";

export const login = async (data: LoginDto) => {
  try {
    const cookieStore = await cookies();

    const res = await fetchApi<LoginResponse>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        origin: "BODEGAS",
      }),
    });

    const authData = res;
    // Verificar que el token esté presente en la respuesta
    if (!authData.token) {
      throw new Error("Token de autenticación no recibido del servidor");
    }

    const authCookieData = AuthCookieSchema.parse(authData);
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(authCookieData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: "/",
    });

    return authData;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al iniciar sesión";
    errorLogger(error, "login");
    throw new Error(errorMessage);
  }
};

export const getMyPermissions = async () => {
  try {
    const response = await fetchApiWithAuth<Record<Permissions, Permissions>>(
      "/rbac/me",
      {
        cache: "force-cache",
      },
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener los permisos";
    console.error("[PERMISOS]: ", error);
    throw new Error(errorMessage);
  }
};
