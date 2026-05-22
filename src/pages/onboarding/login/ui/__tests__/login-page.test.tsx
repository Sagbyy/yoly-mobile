import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { LoginPage } from "../login-page";

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush, back: mockBack, replace: mockReplace }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});
});

describe("LoginPage — rendering", () => {
  it("renders email and password inputs", () => {
    const { getByPlaceholderText } = render(<LoginPage />);
    expect(getByPlaceholderText("maya@exemple.com")).toBeTruthy();
    expect(getByPlaceholderText("••••••••")).toBeTruthy();
  });

  it("renders the sign in button", () => {
    const { getByText } = render(<LoginPage />);
    expect(getByText("Se connecter")).toBeTruthy();
  });
});

describe("LoginPage — validation", () => {
  it("shows an error for an invalid email", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "notanemail",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "secret");
    fireEvent.press(getByText("Se connecter"));
    await waitFor(() => expect(getByText("Email invalide.")).toBeTruthy());
  });

  it("shows an error for an empty password", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "user@test.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "");
    fireEvent.press(getByText("Se connecter"));
    await waitFor(() => expect(getByText("Mot de passe requis.")).toBeTruthy());
  });
});

describe("LoginPage — submission", () => {
  it("calls signIn with correct credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "user@test.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password");
    fireEvent.press(getByText("Se connecter"));
    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "user@test.com",
        "password",
      ),
    );
  });

  it("shows the matching Firebase error message", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new FirebaseError("auth/invalid-credential", "Invalid"),
    );
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "user@test.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password");
    fireEvent.press(getByText("Se connecter"));
    await waitFor(() =>
      expect(getByText("Email ou mot de passe incorrect.")).toBeTruthy(),
    );
  });

  it("shows a generic message for unknown errors", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("network"),
    );
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "user@test.com",
    );
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password");
    fireEvent.press(getByText("Se connecter"));
    await waitFor(() =>
      expect(getByText("Une erreur est survenue.")).toBeTruthy(),
    );
  });
});

describe("LoginPage — navigation", () => {
  it("navigates to register when pressing Sign up", () => {
    const { getByText } = render(<LoginPage />);
    fireEvent.press(getByText("S'inscrire"));
    expect(mockPush).toHaveBeenCalledWith("/(auth)/register");
  });

  it("back button is not pressed by default", () => {
    render(<LoginPage />);
    expect(mockBack).not.toHaveBeenCalled();
  });
});

describe("LoginPage — password visibility", () => {
  it("field is hidden by default", () => {
    const { getByPlaceholderText } = render(<LoginPage />);
    expect(getByPlaceholderText("••••••••").props.secureTextEntry).toBe(true);
  });

  it("toggles secureTextEntry when pressing the eye icon", async () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginPage />);
    fireEvent.press(getByTestId("eye-toggle"));
    await waitFor(() =>
      expect(getByPlaceholderText("••••••••").props.secureTextEntry).toBe(
        false,
      ),
    );
  });
});
