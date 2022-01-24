import { City } from "../../../domain/entities/City";
import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { FindCityByStateRepository } from "../../../application/ports/repositories/city/find-city-by-state-repository";

export class FindCityByStateController implements Controller<City[]> {
  constructor(
    private readonly findCityByStateRepository: FindCityByStateRepository,
    private readonly presenter: ResponseHandler<City[]>
  ) {}

  handleRequest(
    requestModel: RequestModel<any, any, any, any>
  ): Promise<ResponseModel<City[]>> {
    throw new Error("Method not implemented.");
  }
}
