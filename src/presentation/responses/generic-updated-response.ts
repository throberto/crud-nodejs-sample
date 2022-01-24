import { ResponseHandler } from "../../application/ports/responses/response-handler";
import { ResponseModel } from "../../application/ports/responses/response-model";

export class GenericUpdatedResponse implements ResponseHandler<void> {
  async response(body: void): Promise<ResponseModel<void>> {
    const response = {
      statusCode: 204,
      body,
    };

    return response;
  }
}
