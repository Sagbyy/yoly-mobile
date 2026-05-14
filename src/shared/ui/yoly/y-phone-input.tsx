import { cn } from "@/shared/lib/utils";
import { Caption, Body } from "@/shared/ui/typography";
import { getLocales } from "expo-localization";
import countriesLib from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";
import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

countriesLib.registerLocale(frLocale);

function countryToFlag(isoCode: string) {
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
}

function getCountryName(code: string): string {
  return countriesLib.getName(code, "fr") ?? code;
}

const ALL_COUNTRIES = getCountries()
  .map((code) => ({
    code,
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: countryToFlag(code),
    name: getCountryName(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

function detectCountry(): CountryCode {
  try {
    const region = getLocales()[0]?.regionCode as CountryCode;
    if (region && getCountries().includes(region)) return region;
  } catch {}
  return "FR";
}

interface YPhoneInputProps {
  label?: string;
  error?: string;
  value: string;
  onChange: (fullNumber: string) => void;
}

export function YPhoneInput({
  label = "Numéro de téléphone",
  error,
  onChange,
}: YPhoneInputProps) {
  const [countryCode, setCountryCode] = useState<CountryCode>(detectCountry);
  const [displayValue, setDisplayValue] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState("");

  const dialCode = `+${getCountryCallingCode(countryCode)}`;
  const selected = ALL_COUNTRIES.find((c) => c.code === countryCode);

  function handleChangeText(text: string) {
    const formatter = new AsYouType(countryCode);
    const formatted = formatter.input(text.replace(/\D/g, "").slice(0, 15));
    setDisplayValue(formatted);
    onChange(`${dialCode}${text.replace(/\D/g, "")}`);
  }

  function handleSelectCountry(code: CountryCode) {
    setCountryCode(code);
    setDisplayValue("");
    onChange("");
    setPickerVisible(false);
    setSearch("");
  }

  const filteredCountries = useMemo(
    () =>
      search.trim()
        ? ALL_COUNTRIES.filter(
            (c) =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.dialCode.includes(search),
          )
        : ALL_COUNTRIES,
    [search],
  );

  return (
    <View className="gap-1.5">
      <Caption className="text-neutral-600 font-geist-medium">{label}</Caption>

      <View
        className={cn(
          "flex-row border border-neutral-200 rounded-full overflow-hidden bg-white",
          error && "border-health-alert",
        )}
      >
        <Pressable
          onPress={() => setPickerVisible(true)}
          className="flex-row items-center gap-1.5 pl-5 pr-3 py-4 border-r border-neutral-200 active:bg-neutral-50"
        >
          <Body>{selected?.flag}</Body>
          <Caption className="text-ink font-geist-medium">{dialCode}</Caption>
        </Pressable>

        <TextInput
          value={displayValue}
          onChangeText={handleChangeText}
          placeholder="6 00 00 00 00"
          placeholderTextColor="#A3A8C3"
          keyboardType="phone-pad"
          className="flex-1 px-4 font-geist-regular text-body text-ink"
        />
      </View>

      {error && <Caption className="text-health-alert pl-2">{error}</Caption>}

      <Modal
        visible={pickerVisible}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-6 pt-4 pb-3">
            <View className="flex-row items-center border border-neutral-200 rounded-full px-4 py-3 gap-3">
              <Search size={16} color="#A3A8C3" />
              <TextInput
                placeholder="Rechercher un pays..."
                placeholderTextColor="#A3A8C3"
                value={search}
                onChangeText={setSearch}
                autoFocus
                className="flex-1 font-geist-regular text-body text-ink"
              />
            </View>
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectCountry(item.code as CountryCode)}
                className="flex-row items-center justify-between py-4 border-b border-neutral-100 active:bg-neutral-50"
              >
                <View className="flex-row items-center gap-3">
                  <Body>{item.flag}</Body>
                  <Body className="text-ink">{item.name}</Body>
                </View>
                <Caption className="text-neutral-500">{item.dialCode}</Caption>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
