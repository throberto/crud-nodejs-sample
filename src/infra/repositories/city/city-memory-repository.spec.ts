import faker from "faker";

import { City } from "../../../domain/entities/City";
import { CityMemoryRepository } from "./city-memory-repository";

const cityMockFactory = (): City => {
  const name = faker.address.city();
  const state = faker.address.state();
  return new City(name, state);
};

const sutFactory = (cities: City[] = []) => {
  const sut = new CityMemoryRepository(cities);

  return { sut };
};

describe("City Memory Repository", () => {
  it("should find a city by name", async () => {
    const cityMock = cityMockFactory();
    const { sut } = sutFactory([cityMock]);
    const city = await sut.findByName(cityMock.name);
    expect(city?.name).toBe(cityMock.name);
    expect(city?.state).toBe(cityMock.state);
  });

  it("should return null if no city is found using name", async () => {
    const { sut } = sutFactory();
    const cityMock = cityMockFactory();
    const city = await sut.findByName(cityMock.name);
    expect(city).toBeNull();
  });

  it("should find a city by state", async () => {
    const cityMock = cityMockFactory();
    const { sut } = sutFactory([cityMock]);
    const cities = await sut.findByState(cityMock.state);
    expect(cities).toEqual([cityMock]);
  });

  it("should return null if no city is found using state", async () => {
    const { sut } = sutFactory();
    const cityMock = cityMockFactory();
    const city = await sut.findByName(cityMock.name);
    expect(city).toBeNull();
  });

  it("should create a new city", async () => {
    const { sut } = sutFactory();
    const cityMock = cityMockFactory();
    await expect(
      sut.create(cityMock.name, cityMock.state)
    ).resolves.not.toThrowError();
  });
});
