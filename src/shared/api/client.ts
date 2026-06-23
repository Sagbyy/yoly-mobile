import { auth } from "@/shared/lib/firebase";
import { createLogger } from "@/shared/lib/logger";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const log = createLogger("api");

export class ApiError extends Error {
  constructor(
    public status: number,
    public body?: unknown,
  ) {
    super(`HTTP ${status}`);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const method = init?.method ?? "GET";
  const startedAt = Date.now();

  // Attach the current Firebase ID token so the API can authenticate the user.
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
      ...init,
    });
  } catch (networkError) {
    // fetch rejects on connectivity failures (no host, ATS block, timeout…).
    log.error(`${method} ${path} — network failure`, networkError);
    throw networkError;
  }

  const ms = Date.now() - startedAt;

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    log.warn(`${method} ${path} → ${res.status} (${ms}ms)`, { body });
    throw new ApiError(res.status, body);
  }

  log.debug(`${method} ${path} → ${res.status} (${ms}ms)`);
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
