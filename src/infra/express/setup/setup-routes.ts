import { Application } from "express";

export const setupRoutes = (application: Application): void => {
  application.use("/cities", () => {});
  application.use("/clients", () => {});
};
