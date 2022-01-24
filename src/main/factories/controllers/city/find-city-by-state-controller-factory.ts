import { City } from "../../../../domain/entities/City";
import { FindCityByState } from "../../../../application/use-cases/city/find-city-by-state";
import { CityMemoryRepository } from "../../../../infra/repositories/city/city-memory-repository";
import { GenericSuccessResponse } from "../../../../presentation/responses/generic-success-response";
import { FindCityByStateController } from "../../../../presentation/controllers/city/find-city-by-state-controller";
import { FindCityByStateRepository } from "../../../../application/ports/repositories/city/find-city-by-state-repository";

const findCityByStateRepositoryFactory = (): FindCityByStateRepository => {
  return new CityMemoryRepository();
};

export const findCityByStateControllerFactory = () => {
  const findCityByStateRepository = findCityByStateRepositoryFactory();
  const findCityByStateUseCase = new FindCityByState(findCityByStateRepository);
  const findCityByStatePresenter = new GenericSuccessResponse<City[]>();
  const findCityByStateController = new FindCityByStateController(
    findCityByStateUseCase,
    findCityByStatePresenter
  );

  return {
    findCityByStateRepository,
    findCityByStateUseCase,
    findCityByStatePresenter,
    findCityByStateController,
  };
};
