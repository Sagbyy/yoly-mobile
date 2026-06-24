jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"));

jest.mock("react-native-keyboard-controller", () => ({
  KeyboardAwareScrollView: ({ children }: { children: React.ReactNode }) =>
    children,
  KeyboardStickyView: ({ children }: { children: React.ReactNode }) => children,
  KeyboardProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("lottie-react-native", () => "LottieView");

jest.mock("expo-localization", () => ({
  getLocales: () => [{ regionCode: "FR", languageCode: "fr" }],
}));

jest.mock("@/shared/lib/firebase", () => ({
  auth: { currentUser: null },
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  FirebaseError: class FirebaseError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.name = "FirebaseError";
      this.code = code;
    }
  },
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  updateProfile: jest.fn(),
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));
