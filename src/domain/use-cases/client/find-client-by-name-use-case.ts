import { Client } from "../../entities/Client";

export interface FindClientByNameUseCase {
  findByName(name: string): Promise<Client>;
}
