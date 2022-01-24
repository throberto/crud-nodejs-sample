import { CreateClientController } from "./create-client-controller";
import { ResponseModel } from "../../../application/ports/responses/response-model";
import { ResponseHandler } from "../../../application/ports/responses/response-handler";
import { CreateClientUseCase } from "../../../domain/use-cases/client/create-client-use-case";

const sutFactory = () => {
  const createClientUseCaseMock = createClientUseCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new CreateClientController(
    createClientUseCaseMock,
    presenterMock
  );

  return { sut, createClientUseCaseMock, presenterMock };
};

const createClientUseCaseMockFactory = (): CreateClientUseCase => {
  class CreateClientUseCaseMock implements CreateClientUseCase {
    create(
      _id: number,
      _name: string,
      _genre: string,
      _age: number,
      __city: string
    ): Promise<void> {
      return Promise.resolve();
    }
  }

  return new CreateClientUseCaseMock();
};

const presenterMockFactory = (): ResponseHandler<void> => {
  class PresenterMock implements ResponseHandler<void> {
    response(_body: void): Promise<ResponseModel<void>> {
      return Promise.resolve({
        statusCode: 201,
        body: undefined,
      });
    }
  }

  return new PresenterMock();
};

describe("Create Client Controller", () => {
  it("should throw if request.body does not exist", async () => {
    const { sut } = sutFactory();

    await expect(() => {
      return sut.handleRequest({});
    }).rejects.toThrowError("Missing body");
  });

  it("should call use case with correct values", async () => {
    const { sut, createClientUseCaseMock } = sutFactory();
    const createClientUseCaseSpy = jest.spyOn(
      createClientUseCaseMock,
      "create"
    );
    await sut.handleRequest({});
    expect(createClientUseCaseSpy).toBeCalledTimes(1);
    expect(createClientUseCaseSpy).toBeCalledWith({});
  });

  it("should call presenter with the use case result", async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, "response");
    await sut.handleRequest({});
    expect(presenterSpy).toBeCalledTimes(1);
    expect(presenterSpy).toBeCalledWith({});
  });

  it("should return statusCode 201 and body if everything is OK", async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({});
    expect(response).toEqual({
      statusCode: 201,
      body: undefined,
    });
  });
});
