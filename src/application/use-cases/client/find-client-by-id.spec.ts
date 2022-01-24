import faker from "faker";

import { FindClientById } from "./find-client-by-id";
import { Client } from "../../../domain/entities/Client";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";

const findClientByIdRepositoryMockFactory = (): FindClientByIdRepository => {
  class FindClientByIdRepositoryMock implements FindClientByIdRepository {
    findById(_id: number): Promise<Client | null> {
      return Promise.resolve(null);
    }
  }

  return new FindClientByIdRepositoryMock();
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
  const findClientByIdRepositoryMock = findClientByIdRepositoryMockFactory();
  const sut = new FindClientById(findClientByIdRepositoryMock);

  return { sut, findClientByIdRepositoryMock };
};

describe("Find Client by Id", () => {
  it("should throw Error if no client is found", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(null);
    const error = new Error("Client not found");
    const clientMock = clientMockFactory();
    await expect(() => {
      return sut.findById(clientMock.id);
    }).rejects.toThrowError(error);
  });

  it("should return a client if found", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);
    await expect(sut.findById(clientMock.id)).resolves.toEqual(clientMock);
  });

  it("should call client repository with correct values", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    const findClientByIdRepositoryMockSpy = jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);

    await sut.findById(clientMock.id);
    expect(findClientByIdRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(findClientByIdRepositoryMockSpy).toHaveBeenCalledWith(clientMock.id);
  });
});
