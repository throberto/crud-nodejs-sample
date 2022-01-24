import { Client } from "../../../../domain/entities/Client";
import { FindClientById } from "../../../../application/use-cases/client/find-client-by-id";
import { GenericSuccessResponse } from "../../../../presentation/responses/generic-success-response";
import { ClientMemoryRepository } from "../../../../infra/repositories/client/client-memory-repository";
import { FindClientByIdController } from "../../../../presentation/controllers/client/find-client-by-id-controller";
import { FindClientByIdRepository } from "../../../../application/ports/repositories/client/find-client-by-id-repository";

const findClientByIdRepositoryFactory = (): FindClientByIdRepository => {
  return new ClientMemoryRepository();
};

export const findClientByIdControllerFactory = () => {
  const findClientByIdRepository = findClientByIdRepositoryFactory();
  const findClientByIdUseCase = new FindClientById(findClientByIdRepository);
  const findClientByIdPresenter = new GenericSuccessResponse<Client>();
  const findClientByIdController = new FindClientByIdController(
    findClientByIdUseCase,
    findClientByIdPresenter
  );

  return {
    findClientByIdRepository,
    findClientByIdUseCase,
    findClientByIdPresenter,
    findClientByIdController,
  };
};
