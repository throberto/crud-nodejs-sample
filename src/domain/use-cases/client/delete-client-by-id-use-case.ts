export interface DeleteClientByIdUseCase {
  deleteById(id: number): Promise<void>;
}
