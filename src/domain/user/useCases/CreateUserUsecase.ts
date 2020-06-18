import { User } from "@domain/user/entities/User";
import { ICreateUserRequestDTO } from "@domain/user/dto/ICreateUserRequestDTO";
import { ICreateUserResponseDTO } from "@domain/user/dto/ICreateUserResponseDTO";
import { ICreateUserRepo } from "@domain/user/repositories/ICreateUserRepo";
import { IFindUserRepo } from "../repositories/IFindUserRepo";

export interface ICreateUserUseCase {
  createUserRepo: ICreateUserRepo;
  findUserRepo: IFindUserRepo;

  execute: (
    createUserRequestDTO: ICreateUserRequestDTO
  ) => Promise<ICreateUserResponseDTO>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  createUserRepo: ICreateUserRepo;
  findUserRepo: IFindUserRepo;

  constructor(createUserRepo: ICreateUserRepo, findUserRepo: IFindUserRepo) {
    this.createUserRepo = createUserRepo;
    this.findUserRepo = findUserRepo;
  }

  public async execute(
    createUserRequestDTO: ICreateUserRequestDTO
  ): Promise<ICreateUserResponseDTO> {
    const user = await new User(
      undefined,
      this.findUserRepo,
      this.createUserRepo
    );

    const userFound = await user.find(createUserRequestDTO);
    if (userFound) throw new Error("This user already exist");

    const newUserId = await user.create(createUserRequestDTO);
    const newUser = await user.find(newUserId);

    return newUser;
  }
}
