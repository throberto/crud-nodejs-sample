import faker from "faker";

import { FindCityByName } from "./find-city-by-name";
import { City } from "../../../domain/entities/City";
import { FindCityByNameRepository } from "../../ports/repositories/city/find-city-by-name-repository";

const findCityByNameRepositoryMockFactory = (): FindCityByNameRepository => {
  class FindCityByNameRepositoryMock implements FindCityByNameRepository {
    findByName(_name: string): Promise<City | null> {
      return Promise.resolve(null);
    }
  }

  return new FindCityByNameRepositoryMock();
};

const cityMockFactory = (): City => {
  const name = faker.address.city();
  const state = faker.address.state();
  return new City(name, state);
};

const sutFactory = () => {
  const findCityByNameRepositoryMock = findCityByNameRepositoryMockFactory();
  const sut = new FindCityByName(findCityByNameRepositoryMock);

  return { sut, findCityByNameRepositoryMock };
};

describe("Find City by Name", () => {
  it("should throw Error if no city is found", async () => {
    const { sut, findCityByNameRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    jest
      .spyOn(findCityByNameRepositoryMock, "findByName")
      .mockResolvedValue(null);
    const error = new Error("City not found");
    await expect(() => {
      return sut.findByName(cityMock.name);
    }).rejects.toThrowError(error);
  });

  it("should return a city if found", async () => {
    const { sut, findCityByNameRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    jest
      .spyOn(findCityByNameRepositoryMock, "findByName")
      .mockResolvedValue(cityMock);
    await expect(sut.findByName(cityMock.name)).resolves.toEqual(cityMock);
  });

  it("should call city repository with correct values", async () => {
    const { sut, findCityByNameRepositoryMock } = sutFactory();
    const cityMock = cityMockFactory();
    const findCityByNameRepositoryMockSpy = jest
      .spyOn(findCityByNameRepositoryMock, "findByName")
      .mockResolvedValue(cityMock);

    await sut.findByName(cityMock.name);
    expect(findCityByNameRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(findCityByNameRepositoryMockSpy).toHaveBeenCalledWith(cityMock.name);
  });
});
