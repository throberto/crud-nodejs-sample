import { UpdateClient } from "../../../../application/use-cases/client/update-client";
import { GenericUpdatedResponse } from "../../../../presentation/responses/generic-updated-response";
import { ClientMemoryRepository } from "../../../../infra/repositories/client/client-memory-repository";
import { UpdateClientController } from "../../../../presentation/controllers/client/update-client-controller";
import { UpdateClientRepository } from "../../../../application/ports/repositories/client/update-client-repository";
import { FindClientByIdRepository } from "../../../../application/ports/repositories/client/find-client-by-id-repository";

const findClientByIdRepositoryFactory = (): FindClientByIdRepository => {
  return new ClientMemoryRepository();
};

const updateClientRepositoryFactory = (): UpdateClientRepository => {
  return new ClientMemoryRepository();
};

export const updateClientControllerFactory = () => {
  const findClientByIdRepository = findClientByIdRepositoryFactory();
  const updateClientRepository = updateClientRepositoryFactory();
  const updateClientUseCase = new UpdateClient(
    findClientByIdRepository,
    updateClientRepository
  );
  const updateClientPresenter = new GenericUpdatedResponse();
  const updateClientController = new UpdateClientController(
    updateClientUseCase,
    updateClientPresenter
  );

  return {
    findClientByIdRepository,
    updateClientRepository,
    updateClientUseCase,
    updateClientPresenter,
    updateClientController,
  };
};
