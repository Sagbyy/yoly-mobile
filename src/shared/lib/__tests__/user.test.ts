import type { User } from "firebase/auth";

import { getUserDisplay } from "../user";

const asUser = (u: Partial<User> | null) => u as User | null;

describe("getUserDisplay", () => {
  it("uses the display name and derives first name + initials", () => {
    const d = getUserDisplay(asUser({ displayName: "Sarah Rossi", email: "s@x.com" }));
    expect(d.fullName).toBe("Sarah Rossi");
    expect(d.firstName).toBe("Sarah");
    expect(d.initials).toBe("SR");
  });

  it("falls back to the email local-part when no display name", () => {
    const d = getUserDisplay(asUser({ displayName: null, email: "john@x.com" }));
    expect(d.fullName).toBe("john");
    expect(d.firstName).toBe("john");
    expect(d.initials).toBe("J");
  });

  it("returns neutral defaults when there is no user", () => {
    const d = getUserDisplay(null);
    expect(d.fullName).toBe("");
    expect(d.firstName).toBe("vous");
    expect(d.initials).toBe("?");
  });

  it("ignores a whitespace-only display name", () => {
    const d = getUserDisplay(asUser({ displayName: "   ", email: "kim@x.com" }));
    expect(d.firstName).toBe("kim");
  });
});
