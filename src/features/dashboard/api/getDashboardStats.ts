import type { DashboardData } from "#shared/types/dashboardData";
import { fetcher, getBaseUrl } from "#shared/lib/fetcher";

export async function getDashboardStats(): Promise<DashboardData> {
  return fetcher<DashboardData>(`${getBaseUrl()}data/app/dashboardStats.json`);
}
