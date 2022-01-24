import { GenericUpdatedResponse } from "./generic-updated-response";

describe("GenericUpdatedPresenter", () => {
  it("should have properties statusCode 204 and no body", async () => {
    const sut = new GenericUpdatedResponse();

    const expected = {
      statusCode: 204,
    };

    await expect(sut.response()).resolves.toEqual(expected);
  });
});
