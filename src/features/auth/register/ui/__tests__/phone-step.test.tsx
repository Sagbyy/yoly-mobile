import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useRegisterStore } from "../../model/use-register-store";
import { PhoneStep } from "../phone-step.page";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn(), replace: jest.fn() }),
}));

// YPhoneInput ships a complex country picker with native dependencies.
// Replace it with a simple TextInput to keep tests focused on form logic.
jest.mock("@/shared/ui/yoly/y-phone-input", () => {
  return {
    YPhoneInput: ({ onChange, error, label = "Numéro de téléphone" }: any) => (
      <View>
        <Text>{label}</Text>
        <TextInput
          testID="phone-input"
          placeholder="6 00 00 00 00"
          onChangeText={onChange}
        />
        {error ? <Text>{error}</Text> : null}
      </View>
    ),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  useRegisterStore.getState().reset();
});

describe("PhoneStep — rendering", () => {
  it("renders the phone input", () => {
    const { getByTestId } = render(<PhoneStep />);
    expect(getByTestId("phone-input")).toBeTruthy();
  });

  it("renders the field label", () => {
    const { getByText } = render(<PhoneStep />);
    expect(getByText("Numéro de téléphone")).toBeTruthy();
  });

  it("renders the Continue button", () => {
    const { getByText } = render(<PhoneStep />);
    expect(getByText("Continuer")).toBeTruthy();
  });
});

describe("PhoneStep — validation", () => {
  it("shows an error for an invalid format", async () => {
    const { getByTestId, getByText } = render(<PhoneStep />);
    fireEvent.changeText(getByTestId("phone-input"), "0612345678");
    fireEvent.press(getByText("Continuer"));
    await waitFor(() =>
      expect(getByText("Format requis : +33612345678")).toBeTruthy(),
    );
  });
});

describe("PhoneStep — submission", () => {
  it("saves the number and navigates to password step", async () => {
    const { getByTestId, getByText } = render(<PhoneStep />);
    fireEvent.changeText(getByTestId("phone-input"), "+33612345678");
    fireEvent.press(getByText("Continuer"));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/(auth)/register/password");
    });
    expect(useRegisterStore.getState().phone).toBe("+33612345678");
  });
});
