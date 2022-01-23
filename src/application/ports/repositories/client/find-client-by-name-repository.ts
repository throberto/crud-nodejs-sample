import { Client } from "../../../../domain/entities/Client";

export interface FindClientByNameRepository {
  findByName(name: string): Promise<Client | null>;
}
