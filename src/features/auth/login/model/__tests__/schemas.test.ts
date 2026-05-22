import { loginSchema } from "../schemas";

describe("loginSchema", () => {
  it("accepts a valid email and non-empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@test.com",
      password: "secret",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Email invalide.");
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@test.com",
      password: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Mot de passe requis.");
  });

  it("rejects when both fields are missing", () => {
    const result = loginSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThanOrEqual(2);
  });
});
