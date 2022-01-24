import { CreateCity } from "../../../../application/use-cases/city/create-city";
import { CityMemoryRepository } from "../../../../infra/repositories/city/city-memory-repository";
import { GenericCreatedResponse } from "../../../../presentation/responses/generic-created-response";
import { CreateCityController } from "../../../../presentation/controllers/city/create-city-controller";
import { CreateCityRepository } from "../../../../application/ports/repositories/city/create-city-repository";

const createCityRepositoryFactory = (): CreateCityRepository => {
  return new CityMemoryRepository();
};

export const createCityControllerFactory = () => {
  const createCityRepository = createCityRepositoryFactory();
  const createCityUseCase = new CreateCity(createCityRepository);
  const createCityPresenter = new GenericCreatedResponse<void>();
  const createCityController = new CreateCityController(
    createCityUseCase,
    createCityPresenter
  );

  return {
    createCityRepository,
    createCityUseCase,
    createCityPresenter,
    createCityController,
  };
};
