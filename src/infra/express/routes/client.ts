import { Router } from "express";

import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { createClientControllerFactory } from "../../../main/factories/controllers/client/create-client-controller-factory";
import { updateClientControllerFactory } from "../../../main/factories/controllers/client/update-client-controller-factory";
import { findClientByIdControllerFactory } from "../../../main/factories/controllers/client/find-client-by-id-controller-factory";
import { findClientByNameControllerFactory } from "../../../main/factories/controllers/client/find-client-by-name-controller-factory";
import { deleteClientByIdControllerFactory } from "../../../main/factories/controllers/client/delete-client-by-id-controller-factory";

export const clientRoutes = Router();

const { findClientByIdController } = findClientByIdControllerFactory();
const { findClientByNameController } = findClientByNameControllerFactory();
const { createClientController } = createClientControllerFactory();
const { deleteClientByIdController } = deleteClientByIdControllerFactory();
const { updateClientController } = updateClientControllerFactory();

clientRoutes.get("/:id", expressRouteAdapter(findClientByIdController));
clientRoutes.get("/", expressRouteAdapter(findClientByNameController));
clientRoutes.post("/", expressRouteAdapter(createClientController));
clientRoutes.delete("/:id", expressRouteAdapter(deleteClientByIdController));
clientRoutes.put("/:id", expressRouteAdapter(updateClientController));
