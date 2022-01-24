import { Client } from "../../../../domain/entities/Client";

export interface UpdateClientRepository {
  update(id: number, data: Partial<Client>): Promise<void>;
}
