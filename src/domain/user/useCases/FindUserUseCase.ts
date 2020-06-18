import { User } from "@domain/user/entities/User";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";
import { IFindUserResponseDTO } from "@domain/user/dto/IFindUserResponseDTO";
import { IFindUserRepo } from "@domain/user/repositories/IFindUserRepo";

export interface IFindUserUseCase {
  findUserRepo: IFindUserRepo;

  execute: (
    findUserRequestDTO: IFindUserRequestDTO
  ) => Promise<IFindUserResponseDTO>;
}

export class FindUserUseCase implements IFindUserUseCase {
  findUserRepo: IFindUserRepo;

  constructor(findUserRepo: IFindUserRepo) {
    this.findUserRepo = findUserRepo;
  }

  public async execute(
    findUserRequestDTO: IFindUserRequestDTO
  ): Promise<IFindUserResponseDTO> {
    const user = await new User(undefined, this.findUserRepo);

    const userFound = await user.find(findUserRequestDTO);

    if (!userFound) throw new Error("User not found");

    return userFound;
  }
}
