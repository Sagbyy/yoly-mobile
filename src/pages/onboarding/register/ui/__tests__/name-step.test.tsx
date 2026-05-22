import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { useRegisterStore } from "@/features/auth/register";
import { NameStep } from "../name-step.page";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn(), replace: jest.fn() }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useRegisterStore.getState().reset();
});

describe("NameStep — rendering", () => {
  it("renders first name and last name inputs", () => {
    const { getByPlaceholderText } = render(<NameStep />);
    expect(getByPlaceholderText("Maya")).toBeTruthy();
    expect(getByPlaceholderText("Dupont")).toBeTruthy();
  });

  it("renders the Continue button", () => {
    const { getByText } = render(<NameStep />);
    expect(getByText("Continuer")).toBeTruthy();
  });

  it("pre-fills inputs from the store", () => {
    useRegisterStore.setState({ firstName: "Lucie", lastName: "Martin" });
    const { getByDisplayValue } = render(<NameStep />);
    expect(getByDisplayValue("Lucie")).toBeTruthy();
    expect(getByDisplayValue("Martin")).toBeTruthy();
  });
});

describe("NameStep — validation", () => {
  it("shows an error when first name is too short", async () => {
    const { getByPlaceholderText, getByText } = render(<NameStep />);
    fireEvent.changeText(getByPlaceholderText("Maya"), "A");
    fireEvent.changeText(getByPlaceholderText("Dupont"), "Dupont");
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => expect(getByText("Minimum 2 caractères")).toBeTruthy());
  });

  it("shows an error when last name is too short", async () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <NameStep />,
    );
    fireEvent.changeText(getByPlaceholderText("Maya"), "Maya");
    fireEvent.changeText(getByPlaceholderText("Dupont"), "B");
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => {
      const errors = getAllByText("Minimum 2 caractères");
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("NameStep — submission", () => {
  it("saves values to the store and navigates to email step", async () => {
    const { getByPlaceholderText, getByText } = render(<NameStep />);
    fireEvent.changeText(getByPlaceholderText("Maya"), "Sophie");
    fireEvent.changeText(getByPlaceholderText("Dupont"), "Bernard");
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/(auth)/register/email");
    });
    expect(useRegisterStore.getState().firstName).toBe("Sophie");
    expect(useRegisterStore.getState().lastName).toBe("Bernard");
  });
});
