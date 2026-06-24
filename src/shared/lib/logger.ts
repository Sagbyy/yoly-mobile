export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const MIN_LEVEL: LogLevel = __DEV__ ? "debug" : "warn";

export interface LogEntry {
  level: LogLevel;
  scope: string;
  message: string;
  meta?: unknown;
  timestamp: number;
}

export interface LogTransport {
  log(entry: LogEntry): void;
}

const SENSITIVE_KEYS = [
  "authorization",
  "token",
  "idtoken",
  "accesstoken",
  "refreshtoken",
  "devicetoken",
  "password",
  "code",
  "pin",
  "secret",
  "apikey",
  "email",
];

const MAX_STRING = 500;
const REDACTED = "[redacted]";

function redactString(value: string): string {
  const masked = value.replace(/Bearer\s+[A-Za-z0-9._-]+/gi, "Bearer [redacted]");
  return masked.length > MAX_STRING ? `${masked.slice(0, MAX_STRING)}…` : masked;
}

function redact(value: unknown, seen = new WeakSet<object>()): unknown {
  if (value == null) return value;
  if (typeof value === "string") return redactString(value);
  if (typeof value !== "object") return value;

  if (value instanceof Error) {
    return { name: value.name, message: redactString(value.message) };
  }

  if (seen.has(value as object)) return "[circular]";
  seen.add(value as object);

  if (Array.isArray(value)) return value.map((v) => redact(v, seen));

  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    out[key] = SENSITIVE_KEYS.includes(key.toLowerCase())
      ? REDACTED
      : redact(val, seen);
  }
  return out;
}

const consoleTransport: LogTransport = {
  log({ level, scope, message, meta }) {
    const tag = `[${scope}]`;
    const fn =
      level === "error"
        ? console.error
        : level === "warn"
          ? console.warn
          : console.log;
    if (meta === undefined) fn(tag, message);
    else fn(tag, message, meta);
  },
};

const transports: LogTransport[] = [consoleTransport];

export function addTransport(transport: LogTransport): void {
  transports.push(transport);
}

class Logger {
  constructor(private readonly scope: string) {}

  private emit(level: LogLevel, message: string, meta?: unknown) {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) return;
    const entry: LogEntry = {
      level,
      scope: this.scope,
      message,
      meta: meta === undefined ? undefined : redact(meta),
      timestamp: Date.now(),
    };
    for (const t of transports) {
      try {
        t.log(entry);
      } catch {}
    }
  }

  debug = (message: string, meta?: unknown) => this.emit("debug", message, meta);
  info = (message: string, meta?: unknown) => this.emit("info", message, meta);
  warn = (message: string, meta?: unknown) => this.emit("warn", message, meta);
  error = (message: string, meta?: unknown) => this.emit("error", message, meta);

  child(sub: string): Logger {
    return new Logger(`${this.scope}:${sub}`);
  }
}

export function createLogger(scope: string): Logger {
  return new Logger(scope);
}

export const logger = createLogger("app");

let installed = false;

export function installGlobalErrorHandlers(): void {
  if (installed) return;
  installed = true;

  const g = globalThis as unknown as {
    ErrorUtils?: {
      getGlobalHandler?: () => (error: unknown, isFatal?: boolean) => void;
      setGlobalHandler?: (
        handler: (error: unknown, isFatal?: boolean) => void,
      ) => void;
    };
  };

  const errorUtils = g.ErrorUtils;
  const previous = errorUtils?.getGlobalHandler?.();

  errorUtils?.setGlobalHandler?.((error, isFatal) => {
    logger.error(isFatal ? "Uncaught fatal error" : "Uncaught error", error);
    previous?.(error, isFatal);
  });
}
