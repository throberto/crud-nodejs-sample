import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { CreateCityRepository } from "../../../application/ports/repositories/city/create-city-repository";

export class CreateCityController implements Controller<void> {
  constructor(
    private readonly createCityRepository: CreateCityRepository,
    private readonly presenter: ResponseHandler<void>
  ) {}

  handleRequest(
    requestModel: RequestModel<any, any, any, any>
  ): Promise<ResponseModel<void>> {
    throw new Error("Method not implemented.");
  }
}
