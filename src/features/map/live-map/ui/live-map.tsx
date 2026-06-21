import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";
import { circlePolygon, lineString } from "@/shared/lib/geo";
import { Mapbox } from "@/shared/lib/mapbox";
import {
  BatteryIcon,
  FilterIcon,
  LocIcon,
  PhoneIcon,
  PlusIcon,
  PulseIcon,
  SignalIcon,
} from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YLivePin } from "@/shared/ui/map";
import { YAvatar, YPill } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { liveLocation, mapZones, routePath } from "../model/data";

const {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
  FillLayer,
  MarkerView,
  StyleURL,
} = Mapbox;

// Clearance so the bottom sheet sits cleanly above the floating tab bar.
const TAB_BAR_CLEARANCE = 96;

function GlassButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[38px] w-[38px] items-center justify-center rounded-full"
      style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
    >
      {children}
    </Pressable>
  );
}

export function LiveMap() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [zoom, setZoom] = useState(liveLocation.zoom);

  const flyTo = (nextZoom: number, center?: [number, number]) => {
    setZoom(nextZoom);
    cameraRef.current?.setCamera({
      zoomLevel: nextZoom,
      centerCoordinate: center,
      animationDuration: 350,
    });
  };

  return (
    <View className="flex-1">
      {/* Real map */}
      <MapView
        style={{ flex: 1 }}
        styleURL={StyleURL.Light}
        scaleBarEnabled={false}
        logoPosition={{ bottom: 8, left: 8 }}
        attributionPosition={{ bottom: 8, left: 96 }}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: liveLocation.position,
            zoomLevel: liveLocation.zoom,
          }}
        />

        {/* Saved-zone geofences */}
        {mapZones.map((zone) => (
          <ShapeSource
            key={zone.id}
            id={`zone-${zone.id}`}
            shape={circlePolygon(zone.center, zone.radiusMeters)}
          >
            <FillLayer
              id={`zone-fill-${zone.id}`}
              style={{ fillColor: zone.color, fillOpacity: 0.14 }}
            />
            <LineLayer
              id={`zone-line-${zone.id}`}
              style={{
                lineColor: zone.color,
                lineWidth: 1.5,
                lineDasharray: [2, 2],
              }}
            />
          </ShapeSource>
        ))}

        {/* Today's route */}
        <ShapeSource id="route" shape={lineString(routePath)}>
          <LineLayer
            id="route-line"
            style={{
              lineColor: colors.navy,
              lineWidth: 4,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </ShapeSource>

        {/* Live pin */}
        <MarkerView coordinate={liveLocation.position} anchor={{ x: 0.5, y: 0.5 }}>
          <YLivePin initials={liveLocation.initials} />
        </MarkerView>
      </MapView>

      {/* Top nav */}
      <View style={{ position: "absolute", top: insets.top + 8, left: 16, right: 16 }}>
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row gap-1 rounded-full p-1"
            style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
          >
            <View className="rounded-full bg-ink px-3.5 py-1.5">
              <Text className="font-geist-medium text-[12px] text-white">Live</Text>
            </View>
            <Pressable
              onPress={() => router.push(routes.map.routeHistory)}
              className="rounded-full px-3.5 py-1.5"
            >
              <Text className="font-geist-medium text-[12px] text-ink-2">Aujourd&apos;hui</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push(routes.map.savedZones)}
              className="rounded-full px-3.5 py-1.5"
            >
              <Text className="font-geist-medium text-[12px] text-ink-2">Zones</Text>
            </Pressable>
          </View>
          <GlassButton>
            <FilterIcon size={18} color={colors.ink} />
          </GlassButton>
        </View>

        {/* Live status pill */}
        <View className="mt-3 flex-row justify-center">
          <View
            className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(11,11,13,0.92)" }}
          >
            <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: colors.liveDot }} />
            <Text className="font-geist-medium text-[11px] text-white">
              En direct · {liveLocation.updatedAgo}
            </Text>
          </View>
        </View>
      </View>

      {/* Zoom / locate controls */}
      <View
        className="absolute rounded-2xl p-1.5"
        style={{ right: 16, top: insets.top + 120, backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <Pressable
          onPress={() => flyTo(Math.min(zoom + 1, 20))}
          className="h-9 w-9 items-center justify-center"
        >
          <PlusIcon size={16} color={colors.ink} />
        </Pressable>
        <View className="my-0.5 h-px bg-surface-3" />
        <Pressable
          onPress={() => flyTo(Math.max(zoom - 1, 2))}
          className="h-9 w-9 items-center justify-center"
        >
          <Text className="font-geist-semibold text-[18px] text-ink">−</Text>
        </Pressable>
        <View className="my-0.5 h-px bg-surface-3" />
        <Pressable
          onPress={() => flyTo(liveLocation.zoom, liveLocation.position)}
          className="h-9 w-9 items-center justify-center"
        >
          <LocIcon size={18} color={colors.ink} />
        </Pressable>
      </View>

      {/* Bottom sheet */}
      <View
        className="absolute rounded-[28px] bg-white p-[18px]"
        style={{
          left: 12,
          right: 12,
          bottom: insets.bottom + TAB_BAR_CLEARANCE,
          boxShadow: "0 20px 50px -10px rgba(15,26,51,.18), 0 4px 10px rgba(15,26,51,.06)",
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <YAvatar initials={liveLocation.initials} size={44} tone="rose" />
            <View>
              <Text className="font-geist-medium text-[15px] text-ink">
                {liveLocation.name} · {liveLocation.age}
              </Text>
              <Text className="text-[13px] text-ink-3">
                {liveLocation.address} · {liveLocation.lastSeen}
              </Text>
            </View>
          </View>
          <YPill
            label={liveLocation.zoneLabel}
            dotColor={colors.health}
            className="bg-health-soft"
            textClassName="text-health"
          />
        </View>

        <View className="my-3.5 h-px bg-surface-3" />

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3.5">
            <View className="flex-row items-center gap-1.5">
              <BatteryIcon size={16} color={colors.ink2} />
              <Text className="font-geist-medium text-[13px] text-ink-2">
                {liveLocation.battery}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <PulseIcon size={16} color={colors.ink2} />
              <Text className="font-geist-medium text-[13px] text-ink-2">
                {liveLocation.bpm}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <SignalIcon size={14} color={colors.ink2} />
              <Text className="font-geist-medium text-[13px] text-ink-2">
                {liveLocation.signal}
              </Text>
            </View>
          </View>
          <View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-ink">
            <PhoneIcon size={18} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}
