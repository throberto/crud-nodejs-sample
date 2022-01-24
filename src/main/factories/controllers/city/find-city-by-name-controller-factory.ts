import { City } from "../../../../domain/entities/City";
import { FindCityByName } from "../../../../application/use-cases/city/find-city-by-name";
import { CityMemoryRepository } from "../../../../infra/repositories/city/city-memory-repository";
import { GenericSuccessResponse } from "../../../../presentation/responses/generic-success-response";
import { FindCityByNameController } from "../../../../presentation/controllers/city/find-city-by-name-controller";
import { FindCityByNameRepository } from "../../../../application/ports/repositories/city/find-city-by-name-repository";

const findCityByNameRepositoryFactory = (): FindCityByNameRepository => {
  return new CityMemoryRepository();
};

export const findCityByNameControllerFactory = () => {
  const findCityByNameRepository = findCityByNameRepositoryFactory();
  const findCityByNameUseCase = new FindCityByName(findCityByNameRepository);
  const findCityByNamePresenter = new GenericSuccessResponse<City>();
  const findCityByNameController = new FindCityByNameController(
    findCityByNameUseCase,
    findCityByNamePresenter
  );

  return {
    findCityByNameRepository,
    findCityByNameUseCase,
    findCityByNamePresenter,
    findCityByNameController,
  };
};
