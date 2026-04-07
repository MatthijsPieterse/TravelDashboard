import { useQuery } from "@tanstack/react-query";
import type { DashboardData } from "#shared/types/dashboardData";
import { getDashboardStats } from "../api/getDashboardStats";

export function useDashboardStats() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}
