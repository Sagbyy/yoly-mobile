import { useRegisterStore } from "../use-register-store";

beforeEach(() => {
  useRegisterStore.getState().reset();
});

describe("useRegisterStore — initial state", () => {
  it("starts with all fields empty", () => {
    const { firstName, lastName, email, phone } = useRegisterStore.getState();
    expect(firstName).toBe("");
    expect(lastName).toBe("");
    expect(email).toBe("");
    expect(phone).toBe("");
  });
});

describe("useRegisterStore — set", () => {
  it("updates the provided fields", () => {
    useRegisterStore
      .getState()
      .set({ firstName: "Maya", email: "maya@test.com" });
    const { firstName, lastName, email } = useRegisterStore.getState();
    expect(firstName).toBe("Maya");
    expect(email).toBe("maya@test.com");
    expect(lastName).toBe("");
  });

  it("does not touch fields that were not provided", () => {
    useRegisterStore.getState().set({ lastName: "Dupont" });
    useRegisterStore.getState().set({ phone: "+33612345678" });
    const { lastName, phone, firstName } = useRegisterStore.getState();
    expect(lastName).toBe("Dupont");
    expect(phone).toBe("+33612345678");
    expect(firstName).toBe("");
  });
});

describe("useRegisterStore — reset", () => {
  it("resets all fields to empty", () => {
    useRegisterStore.getState().set({
      firstName: "Maya",
      lastName: "Dupont",
      email: "maya@test.com",
      phone: "+33612345678",
    });
    useRegisterStore.getState().reset();
    const { firstName, lastName, email, phone } = useRegisterStore.getState();
    expect(firstName).toBe("");
    expect(lastName).toBe("");
    expect(email).toBe("");
    expect(phone).toBe("");
  });
});
