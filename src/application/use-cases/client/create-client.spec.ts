import faker from "faker";

import { CreateClient } from "./create-client";
import { Client } from "../../../domain/entities/Client";
import { CreateClientRepository } from "../../ports/repositories/client/create-client-repository";

const createClientRepositoryMockFactory = (): CreateClientRepository => {
  class CreateClientRepositoryMock implements CreateClientRepository {
    create(
      _id: number,
      _name: string,
      _genre: string,
      _age: number,
      _city: string
    ): Promise<void> {
      return Promise.resolve();
    }
  }

  return new CreateClientRepositoryMock();
};

const clientMockFactory = (): Client => {
  const id = faker.datatype.number();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const gender = faker.name.gender();
  const age = faker.datatype.number(60);
  const city = faker.address.city();
  return new Client(id, name, gender, age, city);
};

const sutFactory = () => {
  const createClientRepositoryMock = createClientRepositoryMockFactory();
  const sut = new CreateClient(createClientRepositoryMock);
  return { sut, createClientRepositoryMock };
};

describe("Create Client", () => {
  it("should call client repository with correct values", async () => {
    const { sut, createClientRepositoryMock } = sutFactory();
    const createClientRepositorySpy = jest.spyOn(
      createClientRepositoryMock,
      "create"
    );
    const client = clientMockFactory();
    await sut.create(
      client.id,
      client.name,
      client.gender,
      client.age,
      client.city
    );
    expect(createClientRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createClientRepositorySpy).toHaveBeenCalledWith(
      client.id,
      client.name,
      client.gender,
      client.age,
      client.city
    );
  });
});
