import { DeleteClientByIdUseCase } from "../../../domain/use-cases/client/delete-client-by-id-use-case";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";
import { DeleteClientByIdRepository } from "../../ports/repositories/client/delete-client-by-id-repository";

export class DeleteClientById implements DeleteClientByIdUseCase {
  constructor(
    private readonly findClientByIdRepository: FindClientByIdRepository,
    private readonly deleteClientByIdRepository: DeleteClientByIdRepository
  ) {}

  async deleteById(id: number): Promise<void> {
    const client = await this.findClientByIdRepository.findById(id);

    if (!client) {
      throw new Error("Client does not exist");
    }

    this.deleteClientByIdRepository.deleteById(id);
  }
}
