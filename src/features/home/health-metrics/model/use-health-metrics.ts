import {
  getHeartRateSeries,
  getHeartRateSummary,
  getSleepSummary,
  getStepsSummary,
  getStressSummary,
  getTimeZone,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapHealthMetrics } from "./map";
import type { HealthMetric } from "./types";

export function useHealthMetrics() {
  const tz = getTimeZone();
  return useQuery<HealthMetric[]>({
    queryKey: ["health", "home-metrics", tz],
    queryFn: async () => {
      const [hrSummary, hrSeries, steps, sleep, stress] = await Promise.all([
        getHeartRateSummary({ period: "day", tz }),
        getHeartRateSeries({ period: "day", tz }),
        getStepsSummary({ period: "day", tz }),
        getSleepSummary({ period: "day", tz }),
        getStressSummary({ period: "day", tz }),
      ]);
      return mapHealthMetrics({
        heartRate: { summary: hrSummary, series: hrSeries },
        steps,
        sleep,
        stress,
      });
    },
  });
}
