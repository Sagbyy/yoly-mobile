import {
  emailSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
} from "../schemas";

describe("nameSchema", () => {
  it("accepts valid first and last name", () => {
    expect(
      nameSchema.safeParse({ firstName: "Maya", lastName: "Dupont" }).success,
    ).toBe(true);
  });

  it("rejects a first name that is too short", () => {
    const result = nameSchema.safeParse({ firstName: "A", lastName: "Dupont" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Minimum 2 caractères");
  });

  it("rejects a last name that is too short", () => {
    const result = nameSchema.safeParse({ firstName: "Maya", lastName: "B" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Minimum 2 caractères");
  });
});

describe("emailSchema", () => {
  it("accepts a valid email", () => {
    expect(emailSchema.safeParse({ email: "maya@exemple.com" }).success).toBe(
      true,
    );
  });

  it("rejects an invalid email", () => {
    const result = emailSchema.safeParse({ email: "notanemail" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Email invalide");
  });
});

describe("phoneSchema", () => {
  it("accepts a valid E.164 phone number", () => {
    expect(phoneSchema.safeParse({ phone: "+33612345678" }).success).toBe(true);
  });

  it("rejects a number without + prefix", () => {
    const result = phoneSchema.safeParse({ phone: "0612345678" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Format requis : +33612345678",
    );
  });

  it("rejects a number that is too short", () => {
    const result = phoneSchema.safeParse({ phone: "+336" });
    expect(result.success).toBe(false);
  });
});

describe("passwordSchema", () => {
  const validPassword = "Secure1!";

  it("accepts a valid password", () => {
    expect(
      passwordSchema.safeParse({
        password: validPassword,
        confirm: validPassword,
      }).success,
    ).toBe(true);
  });

  it("rejects a password that is too short", () => {
    const result = passwordSchema.safeParse({
      password: "Ab1!",
      confirm: "Ab1!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("8 caractères minimum");
  });

  it("rejects a password without uppercase", () => {
    const result = passwordSchema.safeParse({
      password: "secure1!",
      confirm: "secure1!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Au moins une majuscule");
  });

  it("rejects a password without a digit", () => {
    const result = passwordSchema.safeParse({
      password: "SecureAB!",
      confirm: "SecureAB!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Au moins un chiffre");
  });

  it("rejects a password without a special character", () => {
    const result = passwordSchema.safeParse({
      password: "Secure123",
      confirm: "Secure123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Au moins un caractère spécial",
    );
  });

  it("rejects when passwords do not match", () => {
    const result = passwordSchema.safeParse({
      password: validPassword,
      confirm: "Other1!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Les mots de passe ne correspondent pas",
    );
  });
});
