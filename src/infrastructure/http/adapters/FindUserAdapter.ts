import { IFindUserUseCase } from "@domain/user/useCases/FindUserUseCase";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";
import { IFindUserResponseDTO } from "@domain/user/dto/IFindUserResponseDTO";

export class FindUserAdapter {
  findUserUseCase: IFindUserUseCase;
  findUserRequestDTO: IFindUserRequestDTO;

  constructor(
    findUserUseCase: IFindUserUseCase,
    findUserRequestDTO: IFindUserRequestDTO
  ) {
    this.findUserRequestDTO = findUserRequestDTO;
    this.findUserUseCase = findUserUseCase;
  }

  async find(): Promise<IFindUserResponseDTO> {
    const response = await this.findUserUseCase.execute(
      this.findUserRequestDTO
    );

    return response;
  }
}
