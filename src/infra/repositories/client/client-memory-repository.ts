import { Client } from "../../../domain/entities/Client";
import { CreateClientRepository } from "../../../application/ports/repositories/client/create-client-repository";
import { UpdateClientRepository } from "../../../application/ports/repositories/client/update-client-repository";
import { FindClientByIdRepository } from "../../../application/ports/repositories/client/find-client-by-id-repository";
import { DeleteClientByIdRepository } from "../../../application/ports/repositories/client/delete-client-by-id-repository";
import { FindClientByNameRepository } from "../../../application/ports/repositories/client/find-client-by-name-repository";

export class ClientMemoryRepository
  implements
    CreateClientRepository,
    DeleteClientByIdRepository,
    UpdateClientRepository,
    FindClientByIdRepository,
    FindClientByNameRepository
{
  constructor(private readonly clients: Client[] = []) {}

  async create(
    id: number,
    name: string,
    genre: string,
    age: number,
    city: string
  ): Promise<void> {
    const client = new Client(id, name, genre, age, city);
    this.clients.push(client);
  }

  findById(id: number): Promise<Client | null> {
    const client =
      this.clients.find((client) => {
        return client.id === id;
      }) || null;

    return Promise.resolve(client);
  }

  findByName(name: string): Promise<Client | null> {
    const client =
      this.clients.find((client) => {
        return client.name === name;
      }) || null;

    return Promise.resolve(client);
  }

  async update(id: number, data: Partial<Client>): Promise<void> {
    const client = this.clients.find((client) => {
      return client.id === id;
    });
  }

  async deleteById(id: number): Promise<void> {
    const client = this.clients.findIndex((client) => {
      return client.id === id;
    });

    this.clients.splice(client, 1);
  }
}
