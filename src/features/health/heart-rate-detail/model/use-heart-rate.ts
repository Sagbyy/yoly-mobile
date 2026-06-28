import {
  getHeartRateInsights,
  getHeartRateSeries,
  getHeartRateSummary,
  getTimeZone,
  type HealthPeriod,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapHeartRate, type HeartRateView } from "./map";

export function useHeartRate(period: HealthPeriod) {
  const tz = getTimeZone();
  return useQuery<HeartRateView>({
    queryKey: ["health", "heart-rate", period, tz],
    queryFn: async () => {
      const [summary, series, insights] = await Promise.all([
        getHeartRateSummary({ period, tz }),
        getHeartRateSeries({ period, tz }),
        getHeartRateInsights({ period, tz }),
      ]);
      return mapHeartRate({ summary, series, insights });
    },
  });
}
