import { ApiError, api } from "../client";

describe("api client", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns parsed JSON on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ a: 1 }),
    }) as jest.Mock;

    await expect(api.get<{ a: number }>("/x")).resolves.toEqual({ a: 1 });
  });

  it("returns undefined on 204 No Content", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    }) as jest.Mock;

    await expect(api.delete("/x")).resolves.toBeUndefined();
  });

  it("throws ApiError with status and body on non-2xx", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ message: "nope" }),
    }) as jest.Mock;

    await expect(api.get("/x")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      body: { message: "nope" },
    });
  });

  it("rethrows the underlying error on network failure", async () => {
    const err = new TypeError("Network request failed");
    global.fetch = jest.fn().mockRejectedValue(err) as jest.Mock;

    await expect(api.get("/x")).rejects.toBe(err);
  });

  it("ApiError carries status and body", () => {
    const e = new ApiError(401, { m: "x" });
    expect(e.status).toBe(401);
    expect(e.body).toEqual({ m: "x" });
  });
});
