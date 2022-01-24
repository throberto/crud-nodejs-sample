import { Client } from "../../../domain/entities/Client";
import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { FindClientByNameUseCase } from "../../../domain/use-cases/client/find-client-by-name-use-case";

export class FindClientByNameController implements Controller<Client> {
  constructor(
    private readonly findClientByNameUseCase: FindClientByNameUseCase,
    private readonly presenter: ResponseHandler<Client>
  ) {}

  handleRequest(
    requestModel: RequestModel<any, any, any, any>
  ): Promise<ResponseModel<Client>> {
    throw new Error("Method not implemented.");
  }
}
