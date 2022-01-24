import helmet from "helmet";
import { json, Application } from "express";

export const setupApplication = (application: Application): void => {
  application.use(helmet());
  application.use(json());
};
