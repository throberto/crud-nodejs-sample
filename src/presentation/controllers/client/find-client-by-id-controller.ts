import { Client } from "../../../domain/entities/Client";
import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { FindClientByIdUseCase } from "../../../domain/use-cases/client/find-client-by-id-use-case";

export class FindClientByIdController implements Controller<Client> {
  constructor(
    private readonly findClientByIdUseCase: FindClientByIdUseCase,
    private readonly presenter: ResponseHandler<Client>
  ) {}

  handleRequest(
    requestModel: RequestModel<any, any, any, any>
  ): Promise<ResponseModel<Client>> {
    throw new Error("Method not implemented.");
  }
}
