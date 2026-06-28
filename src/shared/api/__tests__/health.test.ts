import {
  buildHealthQuery,
  getHeartRateSeries,
  getHeartRateSummary,
  getSleepSummary,
  getStepsSeries,
  getStressInsights,
} from "../health";

describe("buildHealthQuery", () => {
  it("returns an empty string when no params are given", () => {
    expect(buildHealthQuery()).toBe("");
    expect(buildHealthQuery({})).toBe("");
  });

  it("drops undefined and empty values", () => {
    expect(buildHealthQuery({ period: "week", date: undefined, tz: "" })).toBe(
      "?period=week",
    );
  });

  it("encodes values and joins multiple params", () => {
    expect(
      buildHealthQuery({ period: "day", tz: "Europe/Paris" }),
    ).toBe("?period=day&tz=Europe%2FParis");
  });
});

describe("health api endpoints", () => {
  function mockFetch() {
    const fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
    global.fetch = fetch as jest.Mock;
    return fetch;
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("requests the heart-rate summary with the query string", async () => {
    const fetch = mockFetch();
    await getHeartRateSummary({ period: "day", tz: "Europe/Paris" });
    expect(fetch.mock.calls[0][0]).toContain(
      "/health/heart-rate/summary?period=day&tz=Europe%2FParis",
    );
  });

  it("requests the heart-rate series", async () => {
    const fetch = mockFetch();
    await getHeartRateSeries({ period: "week" });
    expect(fetch.mock.calls[0][0]).toContain(
      "/health/heart-rate/series?period=week",
    );
  });

  it("requests the stress insights", async () => {
    const fetch = mockFetch();
    await getStressInsights({ period: "month" });
    expect(fetch.mock.calls[0][0]).toContain(
      "/health/stress/insights?period=month",
    );
  });

  it("requests the sleep summary", async () => {
    const fetch = mockFetch();
    await getSleepSummary();
    expect(fetch.mock.calls[0][0]).toContain("/health/sleep/summary");
  });

  it("requests the steps series", async () => {
    const fetch = mockFetch();
    await getStepsSeries({ period: "week" });
    expect(fetch.mock.calls[0][0]).toContain(
      "/health/steps/series?period=week",
    );
  });
});
