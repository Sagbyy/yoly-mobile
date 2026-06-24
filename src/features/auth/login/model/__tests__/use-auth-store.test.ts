import { getPairingStatus } from "@/shared/api/pairing";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthStore } from "../use-auth-store";

jest.mock("@/shared/api/pairing", () => ({
  getPairingStatus: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useAuthStore.setState({ user: null, isLoading: true, watchSync: "unknown" });
});

describe("useAuthStore — initial state", () => {
  it("starts with user null and isLoading true", () => {
    const { user, isLoading } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isLoading).toBe(true);
  });
});

describe("useAuthStore — signIn", () => {
  it("calls signInWithEmailAndPassword with correct arguments", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});
    await useAuthStore.getState().signIn("user@test.com", "password");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "user@test.com",
      "password",
    );
  });

  it("propagates Firebase error when signIn fails", async () => {
    const error = new Error("auth/invalid-credential");
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);
    await expect(
      useAuthStore.getState().signIn("bad@test.com", "wrong"),
    ).rejects.toThrow();
  });
});

describe("useAuthStore — signOut", () => {
  it("calls firebaseSignOut", async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);
    await useAuthStore.getState().signOut();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe("useAuthStore — init", () => {
  const mockUser = { uid: "abc", email: "user@test.com" };

  const fireAuth = async (user: unknown) => {
    let callback: (u: unknown) => Promise<void> = async () => {};
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
      callback = cb;
      return jest.fn();
    });
    useAuthStore.getState().init();
    await callback(user);
  };

  it("sets the user, resolves watch sync (synced) and clears loading", async () => {
    (getPairingStatus as jest.Mock).mockResolvedValue({ linked: true });
    await fireAuth(mockUser);

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isLoading).toBe(false);
    expect(useAuthStore.getState().watchSync).toBe("synced");
  });

  it("marks the account unsynced when no watch is linked", async () => {
    (getPairingStatus as jest.Mock).mockResolvedValue({ linked: false });
    await fireAuth(mockUser);
    expect(useAuthStore.getState().watchSync).toBe("unsynced");
  });

  it("falls back to unsynced when the status request fails", async () => {
    (getPairingStatus as jest.Mock).mockRejectedValue(new Error("network"));
    await fireAuth(mockUser);
    expect(useAuthStore.getState().isLoading).toBe(false);
    expect(useAuthStore.getState().watchSync).toBe("unsynced");
  });

  it("resets state when signed out", async () => {
    await fireAuth(null);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().watchSync).toBe("unknown");
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("returns the unsubscribe function", () => {
    const unsubscribe = jest.fn();
    (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);
    const result = useAuthStore.getState().init();
    expect(result).toBe(unsubscribe);
  });
});

describe("useAuthStore — watch sync flags", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: { uid: "abc" } as never,
      watchSync: "unknown",
    });
  });

  it("markWatchSynced sets synced", async () => {
    await useAuthStore.getState().markWatchSynced();
    expect(useAuthStore.getState().watchSync).toBe("synced");
  });

  it("markWatchUnsynced sets unsynced", async () => {
    await useAuthStore.getState().markWatchUnsynced();
    expect(useAuthStore.getState().watchSync).toBe("unsynced");
  });
});
