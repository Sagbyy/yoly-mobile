import {
  getStepsInsights,
  getStepsSeries,
  getStepsSummary,
  getTimeZone,
} from "@/shared/api/health";
import { useQuery } from "@tanstack/react-query";

import { mapActivity, type ActivityView } from "./map";

export function useActivity() {
  const tz = getTimeZone();
  return useQuery<ActivityView>({
    queryKey: ["health", "steps", tz],
    queryFn: async () => {
      const [summary, series, insights] = await Promise.all([
        getStepsSummary({ period: "day", tz }),
        getStepsSeries({ period: "week", tz }),
        getStepsInsights({ period: "week", tz }),
      ]);
      return mapActivity({ summary, series, insights });
    },
  });
}
