import { Title } from "@/shared/ui";
import { YSegmented, type SegmentOption } from "@/shared/ui/yoly";
import { useMemo, useState } from "react";
import { View } from "react-native";

import { alerts, criticalAlert } from "../model/data";
import type { AlertFilter } from "../model/types";
import { AlertRow } from "./alert-row";
import { CriticalAlertCard } from "./critical-alert-card";

const FILTERS: SegmentOption<AlertFilter>[] = [
  { value: "all", label: "Toutes" },
  { value: "safety", label: "Sécurité" },
  { value: "health", label: "Santé" },
];

export function AlertFeed() {
  const [filter, setFilter] = useState<AlertFilter>("all");

  const visibleAlerts = useMemo(
    () => (filter === "all" ? alerts : alerts.filter((a) => a.category === filter)),
    [filter],
  );

  const showCritical = filter === "all" || criticalAlert.category === filter;

  return (
    <View className="px-5 pt-1">
      <View className="mb-3.5 flex-row items-center justify-between">
        <Title className="text-ink">{"Aujourd'hui"}</Title>
        <YSegmented options={FILTERS} value={filter} onChange={setFilter} />
      </View>

      {showCritical && <CriticalAlertCard alert={criticalAlert} />}

      <View className={showCritical ? "mt-3.5 gap-3" : "gap-3"}>
        {visibleAlerts.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </View>
    </View>
  );
}
