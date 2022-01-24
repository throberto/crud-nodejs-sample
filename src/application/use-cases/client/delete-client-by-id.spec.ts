import faker from "faker";

import { Client } from "../../../domain/entities/Client";
import { DeleteClientById } from "./delete-client-by-id";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";
import { DeleteClientByIdRepository } from "../../ports/repositories/client/delete-client-by-id-repository";

const findClientByIdRepositoryMockFactory = (): FindClientByIdRepository => {
  class FindClientByIdRepositoryMock implements FindClientByIdRepository {
    findById(_id: number): Promise<Client | null> {
      return Promise.resolve(null);
    }
  }

  return new FindClientByIdRepositoryMock();
};

const deleteClientByIdRepositoryMockFactory =
  (): DeleteClientByIdRepository => {
    class DeleteClientByIdRepositoryMock implements DeleteClientByIdRepository {
      deleteById(_id: number): Promise<void> {
        return Promise.resolve();
      }
    }

    return new DeleteClientByIdRepositoryMock();
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
  const deleteClientByIdRepositoryMock =
    deleteClientByIdRepositoryMockFactory();
  const sut = new DeleteClientById(
    findClientByIdRepositoryMock,
    deleteClientByIdRepositoryMock
  );

  return { sut, findClientByIdRepositoryMock, deleteClientByIdRepositoryMock };
};

describe("Delete Client by Id", () => {
  it("should call findClientByIdRepository with correct values", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    const findClientByIdRepositorySpy = jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);
    await sut.deleteById(clientMock.id);
    expect(findClientByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findClientByIdRepositorySpy).toHaveBeenCalledWith(clientMock.id);
  });

  it("should call deleteClientByIdRepository with correct values", async () => {
    const {
      sut,
      findClientByIdRepositoryMock,
      deleteClientByIdRepositoryMock,
    } = sutFactory();
    const clientMock = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);
    const deleteClientByIdRepositorySpy = jest.spyOn(
      deleteClientByIdRepositoryMock,
      "deleteById"
    );
    await sut.deleteById(clientMock.id);
    expect(deleteClientByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(deleteClientByIdRepositorySpy).toHaveBeenCalledWith(clientMock.id);
  });

  it("should delete a client if exists", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValue(clientMock);
    await expect(sut.deleteById(clientMock.id)).resolves.not.toThrowError();
  });

  it("should throw if client does not exist", async () => {
    const { sut, findClientByIdRepositoryMock } = sutFactory();
    const clientMock = clientMockFactory();
    jest
      .spyOn(findClientByIdRepositoryMock, "findById")
      .mockResolvedValueOnce(null);
    const error = new Error("Client does not exist");
    await expect(() => {
      return sut.deleteById(clientMock.id);
    }).rejects.toThrowError(error);
  });
});
