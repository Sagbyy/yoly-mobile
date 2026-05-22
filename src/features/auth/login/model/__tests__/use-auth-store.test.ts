import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthStore } from "../use-auth-store";

beforeEach(() => {
  jest.clearAllMocks();
  useAuthStore.setState({ user: null, isLoading: true });
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
  it("updates user and isLoading via onAuthStateChanged", () => {
    const mockUser = { uid: "abc", email: "user@test.com" };
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    useAuthStore.getState().init();

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("returns the unsubscribe function", () => {
    const unsubscribe = jest.fn();
    (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);
    const result = useAuthStore.getState().init();
    expect(result).toBe(unsubscribe);
  });
});
