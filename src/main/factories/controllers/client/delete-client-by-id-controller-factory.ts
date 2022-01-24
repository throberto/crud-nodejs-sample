import { DeleteClientById } from "../../../../application/use-cases/client/delete-client-by-id";
import { GenericDeletedResponse } from "../../../../presentation/responses/generic-deleted-response";
import { ClientMemoryRepository } from "../../../../infra/repositories/client/client-memory-repository";
import { DeleteClientByIdController } from "../../../../presentation/controllers/client/delete-client-by-id-controller";
import { FindClientByIdRepository } from "../../../../application/ports/repositories/client/find-client-by-id-repository";
import { DeleteClientByIdRepository } from "../../../../application/ports/repositories/client/delete-client-by-id-repository";

const deleteClientByIdRepositoryFactory = (): DeleteClientByIdRepository => {
  return new ClientMemoryRepository();
};

const findClientByIdRepositoryFactory = (): FindClientByIdRepository => {
  return new ClientMemoryRepository();
};

export const deleteClientByIdControllerFactory = () => {
  const deleteClientByIdRepository = deleteClientByIdRepositoryFactory();
  const findClientByIdRepository = findClientByIdRepositoryFactory();
  const deleteClientByIdUseCase = new DeleteClientById(
    findClientByIdRepository,
    deleteClientByIdRepository
  );
  const deletedClientByIdPresenter = new GenericDeletedResponse();
  const deleteClientByIdController = new DeleteClientByIdController(
    deleteClientByIdUseCase,
    deletedClientByIdPresenter
  );

  return {
    deleteClientByIdRepository,
    findClientByIdRepository,
    deleteClientByIdUseCase,
    deletedClientByIdPresenter,
    deleteClientByIdController,
  };
};
