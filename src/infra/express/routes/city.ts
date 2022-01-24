import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { createCityControllerFactory } from "../../../main/factories/controllers/city/create-city-controller-factory";
import { findCityByNameControllerFactory } from "../../../main/factories/controllers/city/find-city-by-name-controller-factory";
import { findCityByStateControllerFactory } from "../../../main/factories/controllers/city/find-city-by-state-controller-factory";

export const cityRoutes = Router();

const { findCityByNameController } = findCityByNameControllerFactory();
const { findCityByStateController } = findCityByStateControllerFactory();
const { createCityController } = createCityControllerFactory();

cityRoutes.post("/", expressRouteAdapter(createCityController));
cityRoutes.get("/", expressRouteAdapter(findCityByNameController));
