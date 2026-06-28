import {
  getStressInsights,
  getStressSeries,
  getStressSummary,
  getTimeZone,
  type HealthPeriod,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapStress, type StressView } from "./map";

export function useStress(period: HealthPeriod) {
  const tz = getTimeZone();
  return useQuery<StressView>({
    queryKey: ["health", "stress", period, tz],
    queryFn: async () => {
      const [summary, series, insights] = await Promise.all([
        getStressSummary({ period, tz }),
        getStressSeries({ period, tz }),
        getStressInsights({ period, tz }),
      ]);
      return mapStress({ summary, series, insights });
    },
  });
}
