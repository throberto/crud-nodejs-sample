import { Client } from "../../../../domain/entities/Client";

export interface FindClientByIdRepository {
  findById(id: number): Promise<Client | null>;
}
