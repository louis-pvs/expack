import adder from "./adder";

describe("adder", () => {
  it("should adds two number", () => {
    expect(adder(1, 2)).toBe(3);
  });
});
