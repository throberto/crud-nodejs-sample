import { CreateCityUseCase } from "../../../domain/use-cases/city/create-city-use-case";
import { CreateCityRepository } from "../../ports/repositories/city/create-city-repository";

export class CreateCity implements CreateCityUseCase {
  constructor(private readonly createCityRepository: CreateCityRepository) {}

  async create(name: string, state: string): Promise<void> {
    this.createCityRepository.create(name, state);
  }
}
