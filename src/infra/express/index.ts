import express from "express";

import { SERVER_PORT } from "./config/env";
import { setupRoutes } from "./setup/setup-routes";
import { setupApplication } from "./setup/setup-application";

export const application = express();

setupApplication(application);
setupRoutes(application);

application.listen(SERVER_PORT, () => {
  console.info(`🚀 Server is running at http://localhost:${SERVER_PORT}`);
});
