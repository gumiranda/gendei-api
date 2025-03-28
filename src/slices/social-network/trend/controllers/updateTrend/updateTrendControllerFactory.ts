import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateTrendFactory } from "@/slices/social-network/trend/useCases";
import { UpdateTrendController } from "@/slices/social-network/trend/controllers";

export const makeUpdateTrendController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateTrend",
    new UpdateTrendController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateTrendFactory()
    )
  );
};
