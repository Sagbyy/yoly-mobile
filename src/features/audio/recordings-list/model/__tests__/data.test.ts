import { allRecordings, findRecording } from "../data";

describe("findRecording", () => {
  it("finds a recording by id", () => {
    const target = allRecordings[2];
    expect(findRecording(target.id)).toBe(target);
  });

  it("falls back to the first recording for an unknown id", () => {
    expect(findRecording("does-not-exist")).toBe(allRecordings[0]);
  });

  it("falls back to the first recording when id is undefined", () => {
    expect(findRecording(undefined)).toBe(allRecordings[0]);
  });
});
