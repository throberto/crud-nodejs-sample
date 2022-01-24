import faker from "faker";

import { GenericSuccessResponse } from "./generic-success-response";

describe("Success Presenter", () => {
  it("should have properties statusCode 200 and body", async () => {
    const sut = new GenericSuccessResponse();

    const body = faker.datatype.json();
    const expected = {
      statusCode: 200,
      body,
    };

    await expect(sut.response(body)).resolves.toEqual(expected);
  });
});
