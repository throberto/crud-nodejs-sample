import faker from "faker";

import { Client } from "../../../domain/entities/Client";
import { ClientMemoryRepository } from "./client-memory-repository";

const clientMockFactory = (): Client => {
  const id = faker.datatype.number();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const gender = faker.name.gender();
  const age = faker.datatype.number(60);
  const city = faker.address.city();
  return new Client(id, name, gender, age, city);
};

const sutFactory = (clients: Client[] = []) => {
  const sut = new ClientMemoryRepository(clients);

  return { sut };
};

describe("Client Memory Repository", () => {
  it("should find a client by id", async () => {
    const clientMock = clientMockFactory();
    const { sut } = sutFactory([clientMock]);
    const client = await sut.findById(clientMock.id);
    expect(client?.id).toBe(clientMock.id);
    expect(client?.age).toBe(clientMock.age);
    expect(client?.city).toBe(clientMock.city);
    expect(client?.gender).toBe(clientMock.gender);
    expect(client?.name).toBe(clientMock.name);
  });

  it("should return null if no client is found using id", async () => {
    const { sut } = sutFactory();
    const clientMock = clientMockFactory();
    const client = await sut.findById(clientMock.id);
    expect(client).toBeNull();
  });

  it("should find a client by name", async () => {
    const clientMock = clientMockFactory();
    const { sut } = sutFactory([clientMock]);
    const client = await sut.findByName(clientMock.name);
    expect(client?.id).toBe(clientMock.id);
    expect(client?.age).toBe(clientMock.age);
    expect(client?.city).toBe(clientMock.city);
    expect(client?.gender).toBe(clientMock.gender);
    expect(client?.name).toBe(clientMock.name);
  });

  it("should return null if no client is found using name", async () => {
    const { sut } = sutFactory();
    const clientMock = clientMockFactory();
    const client = await sut.findByName(clientMock.name);
    expect(client).toBeNull();
  });

  it("should create a new client", async () => {
    const { sut } = sutFactory();
    const clientMock = clientMockFactory();
    await expect(
      sut.create(
        clientMock.id,
        clientMock.name,
        clientMock.gender,
        clientMock.age,
        clientMock.city
      )
    ).resolves.not.toThrowError();
  });

  it("should delete a client", async () => {
    const clientMock = clientMockFactory();
    const { sut } = sutFactory([clientMock]);
    await expect(sut.deleteById(clientMock.id)).resolves.not.toThrowError();
  });

  it("should update a client", async () => {
    const { id, ...data } = clientMockFactory();
    const { sut } = sutFactory([{ id, ...data }]);
    await expect(sut.update(id, data)).resolves.not.toThrowError();
  });
});
