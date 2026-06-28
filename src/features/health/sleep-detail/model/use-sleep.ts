import {
  getSleepInsights,
  getSleepSeries,
  getSleepSummary,
  getTimeZone,
  type HealthPeriod,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapSleep, type SleepView } from "./map";

export function useSleep(period: HealthPeriod) {
  const tz = getTimeZone();
  return useQuery<SleepView>({
    queryKey: ["health", "sleep", period, tz],
    queryFn: async () => {
      const [summary, series, insights] = await Promise.all([
        getSleepSummary({ period, tz }),
        getSleepSeries({ period, tz }),
        getSleepInsights({ period, tz }),
      ]);
      return mapSleep({ summary, series, insights });
    },
  });
}
