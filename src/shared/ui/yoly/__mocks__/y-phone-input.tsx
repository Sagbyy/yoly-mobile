import React from "react";
import { Text, TextInput, View } from "react-native";

export function YPhoneInput({
  onChange,
  error,
  label = "Numéro de téléphone",
}: {
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
}) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        testID="phone-input"
        placeholder="6 00 00 00 00"
        onChangeText={onChange}
      />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
