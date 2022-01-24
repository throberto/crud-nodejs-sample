import faker from "faker";

import { CreateCity } from "./create-city";
import { City } from "../../../domain/entities/City";
import { CreateCityRepository } from "../../ports/repositories/city/create-city-repository";

const cityMockFactory = (): City => {
  const name = faker.address.city();
  const state = faker.address.state();
  return new City(name, state);
};

const createCityRepositoryMockFactory = (): CreateCityRepository => {
  class CreateCityRepositoryMock implements CreateCityRepository {
    create(_name: string, _state: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new CreateCityRepositoryMock();
};

const sutFactory = () => {
  const createCityRepositoryMock = createCityRepositoryMockFactory();
  const sut = new CreateCity(createCityRepositoryMock);

  return { sut, createCityRepositoryMock };
};

describe("Create City", () => {
  it("should call city repository with correct values", async () => {
    const { sut, createCityRepositoryMock } = sutFactory();
    const createCityRepositorySpy = jest.spyOn(
      createCityRepositoryMock,
      "create"
    );
    const city = cityMockFactory();
    await sut.create(city.name, city.state);
    expect(createCityRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createCityRepositorySpy).toHaveBeenCalledWith(city.name, city.state);
  });
});
