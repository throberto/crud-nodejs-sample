import { ResponseHandler } from "../../application/ports/responses/response-handler";
import { ResponseModel } from "../../application/ports/responses/response-model";

export class GenericCreatedResponse<T> implements ResponseHandler<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    const response = {
      statusCode: 201,
      body,
    };

    return response;
  }
}
