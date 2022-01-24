import { GenericDeletedResponse } from "./generic-deleted-response";

describe("GenericDeletedPresenter", () => {
  it("should have properties statusCode 204 and NO body", async () => {
    const sut = new GenericDeletedResponse();

    const expected = {
      statusCode: 204,
    };

    await expect(sut.response()).resolves.toEqual(expected);
  });
});
