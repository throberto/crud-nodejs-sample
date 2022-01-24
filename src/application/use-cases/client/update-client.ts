import { Client } from "../../../domain/entities/Client";
import { UpdateClientUseCase } from "../../../domain/use-cases/client/update-client-use-case";
import { UpdateClientRepository } from "../../ports/repositories/client/update-client-repository";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";

export class UpdateClient implements UpdateClientUseCase {
  constructor(
    private readonly findClientByIdRepository: FindClientByIdRepository,
    private readonly updateClientRepository: UpdateClientRepository
  ) {}

  async update(id: number, data: Partial<Client>): Promise<void> {
    const client = await this.findClientByIdRepository.findById(id);

    if (!client) {
      throw new Error("Client does not exist");
    }

    this.updateClientRepository.update(id, data);
  }
}
