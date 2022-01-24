import { Client } from "../../../../domain/entities/Client";
import { FindClientByName } from "../../../../application/use-cases/client/find-client-by-name";
import { GenericSuccessResponse } from "../../../../presentation/responses/generic-success-response";
import { ClientMemoryRepository } from "../../../../infra/repositories/client/client-memory-repository";
import { FindClientByNameController } from "../../../../presentation/controllers/client/find-client-by-name-controller";
import { FindClientByNameRepository } from "../../../../application/ports/repositories/client/find-client-by-name-repository";

const findClientByNameRepositoryFactory = (): FindClientByNameRepository => {
  return new ClientMemoryRepository();
};

export const findClientByNameControllerFactory = () => {
  const findClientByNameRepository = findClientByNameRepositoryFactory();
  const findClientByNameUseCase = new FindClientByName(
    findClientByNameRepository
  );
  const findClientByNamePresenter = new GenericSuccessResponse<Client>();
  const findClientByNameController = new FindClientByNameController(
    findClientByNameUseCase,
    findClientByNamePresenter
  );

  return {
    findClientByNameRepository,
    findClientByNameUseCase,
    findClientByNamePresenter,
    findClientByNameController,
  };
};
