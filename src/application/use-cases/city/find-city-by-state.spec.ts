import faker from "faker";

import { FindCityByState } from "./find-city-by-state";
import { City } from "../../../domain/entities/City";
import { FindCityByStateRepository } from "../../ports/repositories/city/find-city-by-state-repository";

const findCityByStateRepositoryMockFactory = (): FindCityByStateRepository => {
  class FindCityByStateRepositoryMock implements FindCityByStateRepository {
    findByState(_state: string): Promise<City[]> {
      return Promise.resolve([]);
    }
  }

  return new FindCityByStateRepositoryMock();
};

const cityMockFactory = (): City => {
  const name = faker.address.city();
  const state = faker.address.state();
  return new City(name, state);
};

const sutFactory = () => {
  const findCityByStateRepositoryMock = findCityByStateRepositoryMockFactory();
  const sut = new FindCityByState(findCityByStateRepositoryMock);

  return { sut, findCityByStateRepositoryMock };
};

describe("Find City by State", () => {
  it("should throw Error if no city is found", async () => {
    const { sut, findCityByStateRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    jest
      .spyOn(findCityByStateRepositoryMock, "findByState")
      .mockResolvedValue([]);
    const error = new Error("Cities not found");
    await expect(() => {
      return sut.findByState(cityMock.name);
    }).rejects.toThrowError(error);
  });

  it("should return a city if found", async () => {
    const { sut, findCityByStateRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    jest
      .spyOn(findCityByStateRepositoryMock, "findByState")
      .mockResolvedValue([cityMock]);
    await expect(sut.findByState(cityMock.name)).resolves.toEqual([cityMock]);
  });

  it("should call city repository with correct values", async () => {
    const { sut, findCityByStateRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    const findCityByStateRepositoryMockSpy = jest
      .spyOn(findCityByStateRepositoryMock, "findByState")
      .mockResolvedValue([cityMock]);

    await sut.findByState(cityMock.name);
    expect(findCityByStateRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(findCityByStateRepositoryMockSpy).toHaveBeenCalledWith(
      cityMock.name
    );
  });
});
