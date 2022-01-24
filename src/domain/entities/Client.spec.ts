import { Client } from "./Client";

describe("Client", () => {
  it("", () => {
    const client = new Client(1, "John Due", "Male", 21, "Albany");
    expect(client.name).toBe("John Due");
    expect(client.genere).toBe("Male");
    expect(client.age).toBe(21);
    expect(client.city).toBe("Albany");
  });
});
