import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceRepository } from "@/slices/place/repositories";
import { loadPlaceByPage, LoadPlaceByPage } from "@/slices/place/useCases";

export const makeLoadPlaceByPageFactory = (): LoadPlaceByPage => {
  const repository = new PlaceRepository(makeDatabaseInstance(whiteLabel.database,"place"));
  return loadPlaceByPage(repository);
};
