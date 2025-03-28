import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadTweetlikeController } from "./loadTweetlikeController";
import { fakeTweetlikeEntity } from "@/slices/social-network/tweetlike/entities/TweetlikeEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadTweetlikeController", () => {
  let testInstance: LoadTweetlikeController;
  let loadTweetlike: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadTweetlike = jest.fn();
    loadTweetlike.mockResolvedValue({
      ...fakeTweetlikeEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeTweetlikeEntity._id };
    testInstance = new LoadTweetlikeController(validation, loadTweetlike);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadTweetlike with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTweetlikeEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadTweetlike).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadTweetlike).toHaveBeenCalledTimes(1);
  });
  test("should throws if loadTweetlike throw", async () => {
    loadTweetlike.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
});
