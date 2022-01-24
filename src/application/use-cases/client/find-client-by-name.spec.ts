import faker from "faker";

import { FindClientByName } from "./find-client-by-name";
import { Client } from "../../../domain/entities/Client";
import { FindClientByNameRepository } from "../../ports/repositories/client/find-client-by-name-repository";

const findClientByNameRepositoryMockFactory =
  (): FindClientByNameRepository => {
    class FindClientByNameRepositoryMock implements FindClientByNameRepository {
      findByName(_name: string): Promise<Client | null> {
        return Promise.resolve(null);
      }
    }

    return new FindClientByNameRepositoryMock();
  };

const clientMockFactory = (): Client => {
  const id = faker.datatype.number();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const gender = faker.name.gender();
  const age = faker.datatype.number(60);
  const city = faker.address.cityName();
  return new Client(id, name, gender, age, city);
};

const sutFactory = () => {
  const findClientByNameRepositoryMock =
    findClientByNameRepositoryMockFactory();
  const sut = new FindClientByName(findClientByNameRepositoryMock);

  return { sut, findClientByNameRepositoryMock };
};

describe("Find Client by Name", () => {
  it("should throw Error if no client is found", async () => {
    const { sut, findClientByNameRepositoryMock } = sutFactory();
    jest
      .spyOn(findClientByNameRepositoryMock, "findByName")
      .mockResolvedValue(null);
    const error = new Error("Client not found");
    await expect(() => {
      return sut.findByName("John Due");
    }).rejects.toThrowError(error);
  });

  it("should return a client if found", async () => {
    const { sut, findClientByNameRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    jest
      .spyOn(findClientByNameRepositoryMock, "findByName")
      .mockResolvedValue(clientMock);
    await expect(sut.findByName(clientMock.name)).resolves.toEqual(clientMock);
  });

  it("should call client repository with correct values", async () => {
    const { sut, findClientByNameRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    const findClientByNameRepositoryMockSpy = jest
      .spyOn(findClientByNameRepositoryMock, "findByName")
      .mockResolvedValue(clientMock);

    await sut.findByName(clientMock.name);
    expect(findClientByNameRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(findClientByNameRepositoryMockSpy).toHaveBeenCalledWith(
      clientMock.name
    );
  });
});
