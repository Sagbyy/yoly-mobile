import { colors } from "@/shared/config/tokens";
import { YRing } from "@/shared/ui/charts";
import { Body, Caption, Display, Micro, Title } from "@/shared/ui";
import { YErrorState, YLoadingState, YPill } from "@/shared/ui/yoly";
import { View } from "react-native";

import { useHealthOverview } from "../model/use-health-overview";
import { HealthMetricRowCard } from "./health-metric-row";

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function HealthOverview() {
  const { data, isPending, isError, refetch } = useHealthOverview();

  if (isPending) return <YLoadingState />;
  if (isError || !data) return <YErrorState onRetry={() => refetch()} />;

  return (
    <View className="px-5 pt-1">
      <View>
        <Caption className="text-ink-3">{data.caption}</Caption>
        <Title className="text-ink">{data.headline}</Title>
      </View>

      <View
        className="mt-4 flex-row items-center justify-between rounded-[20px] bg-surface p-[22px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="flex-1 pr-3">
          <Micro>SCORE DU JOUR</Micro>
          <View className="mt-1.5 flex-row items-center gap-2.5">
            <Display className="text-ink" style={{ fontSize: 48, lineHeight: 50 }}>
              {data.score}
            </Display>
            <YPill
              label={data.scoreDelta}
              dotColor={colors.health}
              className="bg-health-soft"
              textClassName="text-health"
            />
          </View>
          <Body className="mt-2 text-ink-2">{data.scoreNote}</Body>
        </View>
        <YRing pct={data.score} size={108} color={colors.health} />
      </View>

      <View className="mt-4 gap-3">
        {data.rows.map((row) => (
          <HealthMetricRowCard key={row.id} row={row} />
        ))}
      </View>
    </View>
  );
}
