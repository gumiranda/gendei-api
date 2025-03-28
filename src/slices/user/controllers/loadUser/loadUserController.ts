/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import type { LoadUserDetailed } from "../../useCases";

export class LoadUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserDetailed: LoadUserDetailed
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const userLoaded = await this.loadUserDetailed({
      fields: httpRequest?.query,
      options: {
        include: { owner: true },
      },
    });
    return ok(userLoaded);
  }
}
