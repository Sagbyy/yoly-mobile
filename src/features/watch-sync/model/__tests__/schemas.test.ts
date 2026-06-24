import { pairingSchema } from "../schemas";

describe("pairingSchema", () => {
  it("accepts a 6-digit code", () => {
    expect(pairingSchema.safeParse({ code: "482915" }).success).toBe(true);
  });

  it("rejects codes that are not 6 digits", () => {
    expect(pairingSchema.safeParse({ code: "12345" }).success).toBe(false);
    expect(pairingSchema.safeParse({ code: "1234567" }).success).toBe(false);
  });

  it("rejects non-numeric codes", () => {
    const result = pairingSchema.safeParse({ code: "12a4b6" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Entrez les 6 chiffres affichés sur la montre.",
    );
  });
});
