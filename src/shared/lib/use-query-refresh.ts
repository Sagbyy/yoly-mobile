import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useQueryRefresh(queryKeys: QueryKey[]) {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const serialized = JSON.stringify(queryKeys);

  const onRefresh = useCallback(async () => {
    const keys = JSON.parse(serialized) as QueryKey[];
    setRefreshing(true);
    try {
      await Promise.all(
        keys.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      );
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, serialized]);

  return { refreshing, onRefresh };
}
