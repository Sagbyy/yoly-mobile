import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { useRegisterStore } from "../../model/use-register-store";
import { PasswordStep } from "../password-step.page";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn(), replace: jest.fn() }),
}));

const VALID_PASSWORD = "Secure1!";

beforeEach(() => {
  jest.clearAllMocks();
  useRegisterStore.setState({
    firstName: "Maya",
    lastName: "Dupont",
    email: "maya@test.com",
    phone: "+33612345678",
  });
  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { displayName: null },
  });
  (updateProfile as jest.Mock).mockResolvedValue(undefined);
  (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);
});

describe("PasswordStep — rendering", () => {
  it("renders both password fields", () => {
    const { getAllByPlaceholderText } = render(<PasswordStep />);
    expect(getAllByPlaceholderText("••••••••").length).toBe(2);
  });

  it("masks passwords by default", () => {
    const { getAllByPlaceholderText } = render(<PasswordStep />);
    getAllByPlaceholderText("••••••••").forEach((input) => {
      expect(input.props.secureTextEntry).toBe(true);
    });
  });
});

describe("PasswordStep — validation", () => {
  it("shows an error when password is too short", async () => {
    const { getAllByPlaceholderText, getByText } = render(<PasswordStep />);
    const [password, confirm] = getAllByPlaceholderText("••••••••");
    fireEvent.changeText(password, "Aa1!");
    fireEvent.changeText(confirm, "Aa1!");
    fireEvent.press(getByText("Créer mon compte"));
    await waitFor(() => expect(getByText("8 caractères minimum")).toBeTruthy());
  });

  it("shows an error when passwords do not match", async () => {
    const { getAllByPlaceholderText, getByText } = render(<PasswordStep />);
    const [password, confirm] = getAllByPlaceholderText("••••••••");
    fireEvent.changeText(password, VALID_PASSWORD);
    fireEvent.changeText(confirm, "Other123!");
    fireEvent.press(getByText("Créer mon compte"));
    await waitFor(() =>
      expect(getByText("Les mots de passe ne correspondent pas")).toBeTruthy(),
    );
  });
});

describe("PasswordStep — submission", () => {
  it("calls registerWithEmail and navigates to success", async () => {
    const { getAllByPlaceholderText, getByText } = render(<PasswordStep />);
    const [password, confirm] = getAllByPlaceholderText("••••••••");
    fireEvent.changeText(password, VALID_PASSWORD);
    fireEvent.changeText(confirm, VALID_PASSWORD);
    fireEvent.press(getByText("Créer mon compte"));
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "maya@test.com",
        VALID_PASSWORD,
      );
      expect(mockPush).toHaveBeenCalledWith("/(auth)/register/success");
    });
  });

  it("shows the Firebase email-already-in-use error", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new FirebaseError("auth/email-already-in-use", "Email already in use"),
    );
    const { getAllByPlaceholderText, getByText } = render(<PasswordStep />);
    const [password, confirm] = getAllByPlaceholderText("••••••••");
    fireEvent.changeText(password, VALID_PASSWORD);
    fireEvent.changeText(confirm, VALID_PASSWORD);
    fireEvent.press(getByText("Créer mon compte"));
    await waitFor(() =>
      expect(getByText("Cet email est déjà utilisé.")).toBeTruthy(),
    );
  });

  it("shows a generic message for unknown errors", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("network"),
    );
    const { getAllByPlaceholderText, getByText } = render(<PasswordStep />);
    const [password, confirm] = getAllByPlaceholderText("••••••••");
    fireEvent.changeText(password, VALID_PASSWORD);
    fireEvent.changeText(confirm, VALID_PASSWORD);
    fireEvent.press(getByText("Créer mon compte"));
    await waitFor(() =>
      expect(getByText("Une erreur est survenue.")).toBeTruthy(),
    );
  });
});

describe("PasswordStep — visibility", () => {
  it("toggles password visibility", async () => {
    const { getAllByPlaceholderText, getAllByTestId } = render(
      <PasswordStep />,
    );
    const [passwordInput] = getAllByPlaceholderText("••••••••");
    expect(passwordInput.props.secureTextEntry).toBe(true);
    const [firstToggle] = getAllByTestId("eye-toggle");
    fireEvent.press(firstToggle);
    await waitFor(() =>
      expect(getAllByPlaceholderText("••••••••")[0].props.secureTextEntry).toBe(
        false,
      ),
    );
  });
});
