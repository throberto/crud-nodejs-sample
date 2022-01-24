import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { UpdateClientUseCase } from "../../../domain/use-cases/client/update-client-use-case";

export class UpdateClientController implements Controller<void> {
  constructor(
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly presenter: ResponseHandler<void>
  ) {}

  handleRequest(
    requestModel: RequestModel<any, any, any, any>
  ): Promise<ResponseModel<void>> {
    throw new Error("Method not implemented.");
  }
}
