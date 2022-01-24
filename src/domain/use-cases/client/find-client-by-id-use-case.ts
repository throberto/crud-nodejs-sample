import { Client } from "../../entities/Client";

export interface FindClientByIdUseCase {
  findById(id: number): Promise<Client>;
}
