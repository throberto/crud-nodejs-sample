import { Client } from "../../../domain/entities/Client";
import { Controller } from "../../../application/ports/controllers/controller";
import { RequestModel } from "../../../application/ports/requests/request-model";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { CreateClientUseCase } from "../../../domain/use-cases/client/create-client-use-case";

export class CreateClientController implements Controller<void> {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly presenter: ResponseHandler<void>
  ) {}

  async handleRequest(
    requestModel: RequestModel<Partial<Client>, any, any, any>
  ): Promise<ResponseModel<void>> {
    const { body } = requestModel;
    if (!body) {
      throw new Error("Missing body");
    }

    const { id, name, gender, age, city } = body;
    await this.createClientUseCase.create(id, name, gender, age, city);
    return await this.presenter.response();
  }
}
