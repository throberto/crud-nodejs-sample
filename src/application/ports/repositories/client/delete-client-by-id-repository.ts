export interface DeleteClientByIdRepository {
  deleteById(id: number): Promise<void>;
}
