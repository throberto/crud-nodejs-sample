import { CreateClient } from "../../../../application/use-cases/client/create-client";
import { ClientMemoryRepository } from "../../../../infra/repositories/client/client-memory-repository";
import { CreateClientRepository } from "../../../../application/ports/repositories/client/create-client-repository";
import { GenericCreatedResponse } from "../../../../presentation/responses/generic-created-response";
import { CreateClientController } from "../../../../presentation/controllers/client/create-client-controller";

const createClientRepositoryFactory = (): CreateClientRepository => {
  return new ClientMemoryRepository();
};

export const createClientControllerFactory = () => {
  const createClientRepository = createClientRepositoryFactory();
  const createClientUseCase = new CreateClient(createClientRepository);
  const createdClientPresenter = new GenericCreatedResponse<void>();
  const createClientController = new CreateClientController(
    createClientUseCase,
    createdClientPresenter
  );

  return {
    createClientRepository,
    createClientUseCase,
    createdClientPresenter,
    createClientController,
  };
};
