import {
  getHeartRateSeries,
  getHeartRateSummary,
  getSleepSummary,
  getStepsSummary,
  getStressSeries,
  getStressSummary,
  getTimeZone,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapHealthOverview } from "./map";
import type { HealthOverview } from "./types";

export function useHealthOverview() {
  const tz = getTimeZone();
  return useQuery<HealthOverview>({
    queryKey: ["health", "overview", tz],
    queryFn: async () => {
      const [hrSummary, hrSeries, stressSummary, stressSeries, sleep, steps] =
        await Promise.all([
          getHeartRateSummary({ period: "day", tz }),
          getHeartRateSeries({ period: "day", tz }),
          getStressSummary({ period: "day", tz }),
          getStressSeries({ period: "day", tz }),
          getSleepSummary({ period: "day", tz }),
          getStepsSummary({ period: "day", tz }),
        ]);
      return mapHealthOverview({
        heartRate: { summary: hrSummary, series: hrSeries },
        stress: { summary: stressSummary, series: stressSeries },
        sleep,
        steps,
      });
    },
  });
}
