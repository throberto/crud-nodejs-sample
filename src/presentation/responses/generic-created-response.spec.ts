import faker from "faker";

import { GenericCreatedResponse } from "./generic-created-response";

describe("Created Presenter", () => {
  it("should have properties statusCode 201 and body", async () => {
    const sut = new GenericCreatedResponse();

    const body = faker.datatype.json();
    const expected = {
      statusCode: 201,
      body,
    };

    await expect(sut.response(body)).resolves.toEqual(expected);
  });
});
