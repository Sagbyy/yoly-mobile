import { auth } from "@/shared/lib/firebase";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { sendEmailVerification } from "firebase/auth";
import React from "react";
import { useRegisterStore } from "@/features/auth/register";
import { SuccessStep } from "../success-step.page";

// Cast to allow mutating currentUser on the mock object from jest.setup.ts
const mockAuth = auth as { currentUser: { uid: string } | null };

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: mockReplace }),
}));

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockAuth.currentUser = null;
  useRegisterStore.setState({
    firstName: "Maya",
    lastName: "Dupont",
    email: "maya@test.com",
    phone: "+33612345678",
  });
  (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);
});

describe("SuccessStep — rendering", () => {
  it("renders the user's first name", () => {
    const { getByText } = render(<SuccessStep />);
    expect(getByText(/Bienvenue Maya/)).toBeTruthy();
  });

  it("renders the user's email address", () => {
    const { getByText } = render(<SuccessStep />);
    expect(getByText("maya@test.com")).toBeTruthy();
  });

  it("renders the action buttons", () => {
    const { getByText } = render(<SuccessStep />);
    expect(getByText("Ouvrir ma boîte mail")).toBeTruthy();
    expect(getByText("Renvoyer l'email")).toBeTruthy();
    expect(getByText("Aller à la connexion")).toBeTruthy();
  });
});

describe("SuccessStep — email resend", () => {
  it("calls sendEmailVerification when currentUser is defined", async () => {
    mockAuth.currentUser = { uid: "abc" };

    const { getByText } = render(<SuccessStep />);
    fireEvent.press(getByText("Renvoyer l'email"));

    await waitFor(() => expect(sendEmailVerification).toHaveBeenCalledTimes(1));
  });

  it("shows confirmation message after a successful resend", async () => {
    mockAuth.currentUser = { uid: "abc" };

    const { getByText } = render(<SuccessStep />);
    fireEvent.press(getByText("Renvoyer l'email"));

    await waitFor(() => expect(getByText("Email renvoyé !")).toBeTruthy());
  });
});

describe("SuccessStep — navigation", () => {
  it("resets the store and navigates to /login", () => {
    const { getByText } = render(<SuccessStep />);
    fireEvent.press(getByText("Aller à la connexion"));
    expect(mockReplace).toHaveBeenCalledWith("/(auth)/login");
    expect(useRegisterStore.getState().firstName).toBe("");
    expect(useRegisterStore.getState().email).toBe("");
  });
});
