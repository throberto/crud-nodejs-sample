import { Client } from "../../entities/Client";

export interface UpdateClientUseCase {
  update(id: number, data: Partial<Client>): Promise<void>;
}
