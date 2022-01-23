import { City } from "./City";

describe("City", () => {
  it("", () => {
    const city = new City("Albany", "New York");
    expect(city.name).toBe("Albany");
    expect(city.state).toBe("New York");
  });
});
