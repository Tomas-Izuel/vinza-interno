"use server";

import { filtersToSearchParams } from "@/lib/utils";
import { fetchApiWithAuth } from "@/lib/utils.server";
import { AuditResponse, PaginationParams } from "./audit.type";

export const getAudits = async (params?: PaginationParams) => {
  const queryString = filtersToSearchParams(params);
  const url = queryString ? `/audits?${queryString}` : "/audits";

  return fetchApiWithAuth<AuditResponse>(url);
};
