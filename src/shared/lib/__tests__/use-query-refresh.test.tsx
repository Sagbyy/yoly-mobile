import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-native";
import type { ReactNode } from "react";

import { useQueryRefresh } from "../use-query-refresh";

describe("useQueryRefresh", () => {
  it("invalidates every query key and resets the refreshing flag", async () => {
    const queryClient = new QueryClient();
    const spy = jest
      .spyOn(queryClient, "invalidateQueries")
      .mockResolvedValue(undefined);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useQueryRefresh([["health"], ["pairing"]]),
      { wrapper },
    );

    expect(result.current.refreshing).toBe(false);

    await act(async () => {
      await result.current.onRefresh();
    });

    expect(spy).toHaveBeenCalledWith({ queryKey: ["health"] });
    expect(spy).toHaveBeenCalledWith({ queryKey: ["pairing"] });
    expect(result.current.refreshing).toBe(false);
  });
});
