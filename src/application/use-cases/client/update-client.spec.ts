import faker from "faker";

import { UpdateClient } from "./update-client";
import { Client } from "../../../domain/entities/Client";
import { UpdateClientRepository } from "../../ports/repositories/client/update-client-repository";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";

const clientMockFactory = (): Client => {
  const id = faker.datatype.number();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const gender = faker.name.gender();
  const age = faker.datatype.number(60);
  const city = faker.address.city();
  return new Client(id, name, gender, age, city);
};

const findClientByIdRepositoryMockFactory = (): FindClientByIdRepository => {
  class FindClientByIdRepositoryMock implements FindClientByIdRepository {
    findById(_id: number): Promise<Client | null> {
      return Promise.resolve(null);
    }
  }

  return new FindClientByIdRepositoryMock();
};

const updateClientRepositoryMockFactory = (): UpdateClientRepository => {
  class UpdateClientRepositoryMock implements UpdateClientRepository {
    update(_id: number, _data: Partial<Client>): Promise<void> {
      return Promise.resolve();
    }
  }

  return new UpdateClientRepositoryMock();
};

const sutFactory = () => {
  const findClientByIdRepositoryMock = findClientByIdRepositoryMockFactory();
  const updateClientRepositoryMock = updateClientRepositoryMockFactory();
  const sut = new UpdateClient(
    findClientByIdRepositoryMock,
    updateClientRepositoryMock
  );

  return {
    sut,
    findClientByIdRepositoryMock,
    updateClientRepositoryMock,
  };
};

describe("Update Client", () => {
  it("should call findClientByIdRepository with correct values", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    const findClientByIdRepositorySpy = jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);
    await sut.update(clientMock.id, { city: faker.address.city() });
    expect(findClientByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findClientByIdRepositorySpy).toHaveBeenCalledWith(clientMock.id);
  });

  it("should throw if client does not exist", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(null);
    const { id, ...data } = clientMockFactory();
    const error = new Error("Client does not exist");
    await expect(() => {
      return sut.update(id, data);
    }).rejects.toThrowError(error);
  });

  it("should call updateClientRepository with correct values", async () => {
    const { sut, findClientByIdRepositoryMock, updateClientRepositoryMock } =
      sutFactory();
    const { id, ...data } = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue({ id, ...data });
    const updateUserRepositorySpy = jest.spyOn(
      updateClientRepositoryMock,
      "update"
    );
    await sut.update(id, data);
    expect(updateUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith(id, data);
  });

  it("should not return any error if everything is ok", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const { id, ...data } = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue({ id, ...data });

    await expect(sut.update(id, data)).resolves.not.toThrowError();
  });
});
