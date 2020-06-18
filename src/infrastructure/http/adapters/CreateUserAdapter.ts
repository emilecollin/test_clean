import { ICreateUserUseCase } from "@domain/user/useCases/CreateUserUseCase";
import { ICreateUserRequestDTO } from "@domain/user/dto/ICreateUserRequestDTO";
import { ICreateUserResponseDTO } from "@domain/user/dto/ICreateUserResponseDTO";

export class CreateUserAdapter {
  createUserUseCase: ICreateUserUseCase;
  createUserRequestDTO: ICreateUserRequestDTO;

  constructor(
    createUserUseCase: ICreateUserUseCase,
    createUserRequestDTO: ICreateUserRequestDTO
  ) {
    this.createUserRequestDTO = createUserRequestDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async create(): Promise<ICreateUserResponseDTO> {
    const response = await this.createUserUseCase.execute(
      this.createUserRequestDTO
    );

    return response;
  }
}
