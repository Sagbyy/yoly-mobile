import { addTransport, createLogger, type LogEntry } from "../logger";

const entries: LogEntry[] = [];
addTransport({ log: (e) => entries.push(e) });
const log = createLogger("test");

const last = () => entries[entries.length - 1];

describe("logger redaction", () => {
  it("masks sensitive keys, including nested ones", () => {
    log.error("msg", {
      token: "abc",
      nested: { password: "x", ok: 1 },
      email: "a@b.com",
    });
    const meta = last().meta as Record<string, unknown>;
    expect(meta.token).toBe("[redacted]");
    expect(meta.email).toBe("[redacted]");
    expect((meta.nested as Record<string, unknown>).password).toBe("[redacted]");
    expect((meta.nested as Record<string, unknown>).ok).toBe(1);
  });

  it("masks inline bearer tokens in strings", () => {
    log.warn("msg", { header: "Bearer abc.def-123" });
    const meta = last().meta as Record<string, unknown>;
    expect(meta.header).toBe("Bearer [redacted]");
  });

  it("handles circular references", () => {
    const o: Record<string, unknown> = {};
    o.self = o;
    log.info("msg", o);
    const meta = last().meta as Record<string, unknown>;
    expect(meta.self).toBe("[circular]");
  });

  it("truncates very long strings", () => {
    log.error("msg", { blob: "a".repeat(800) });
    const meta = last().meta as Record<string, unknown>;
    expect((meta.blob as string).endsWith("…")).toBe(true);
    expect((meta.blob as string).length).toBeLessThanOrEqual(501);
  });

  it("normalizes Error objects", () => {
    log.error("boom", new Error("kaboom"));
    expect(last().meta).toEqual({ name: "Error", message: "kaboom" });
  });
});
