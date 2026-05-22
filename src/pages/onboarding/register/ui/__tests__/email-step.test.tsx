import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { useRegisterStore } from "@/features/auth/register";
import { EmailStep } from "../email-step.page";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn(), replace: jest.fn() }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useRegisterStore.getState().reset();
});

describe("EmailStep — rendering", () => {
  it("renders the email input", () => {
    const { getByPlaceholderText } = render(<EmailStep />);
    expect(getByPlaceholderText("maya@exemple.com")).toBeTruthy();
  });

  it("pre-fills the input from the store", () => {
    useRegisterStore.setState({ email: "lucie@test.com" });
    const { getByDisplayValue } = render(<EmailStep />);
    expect(getByDisplayValue("lucie@test.com")).toBeTruthy();
  });
});

describe("EmailStep — validation", () => {
  it("shows an error for an invalid email", async () => {
    const { getByPlaceholderText, getByText } = render(<EmailStep />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "notanemail",
    );
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => expect(getByText("Email invalide")).toBeTruthy());
  });

  it("shows no error for a valid email", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <EmailStep />,
    );
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "valid@test.com",
    );
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => expect(mockPush).toHaveBeenCalled());
    expect(queryByText("Email invalide")).toBeNull();
  });
});

describe("EmailStep — submission", () => {
  it("saves email to the store and navigates to phone step", async () => {
    const { getByPlaceholderText, getByText } = render(<EmailStep />);
    fireEvent.changeText(
      getByPlaceholderText("maya@exemple.com"),
      "maya@test.com",
    );
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/(auth)/register/phone");
    });
    expect(useRegisterStore.getState().email).toBe("maya@test.com");
  });
});
