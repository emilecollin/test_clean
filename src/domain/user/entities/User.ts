import { IFindUserRepo } from "@domain/user/repositories/IFindUserRepo";
import { ICreateUserRepo } from "@domain/user/repositories/ICreateUserRepo";
import { IFindUserRequestDTO } from "../dto/IFindUserRequestDTO";
import { IFindUserResponseDTO } from "../dto/IFindUserResponseDTO";
import { ICreateUserRequestDTO } from "../dto/ICreateUserRequestDTO";

export class User {
  name: string;
  surname: string;
  findUserRepo: IFindUserRepo;
  createUserRepo: ICreateUserRepo;

  constructor(
    userDTO?,
    findUserRepo?: IFindUserRepo,
    createUserRepo?: ICreateUserRepo
  ) {
    this.name = userDTO?.name;
    this.surname = userDTO?.surname;
    this.findUserRepo = findUserRepo;
    this.createUserRepo = createUserRepo;
  }

  async find(
    loginUserDTORequest: IFindUserRequestDTO
  ): Promise<IFindUserResponseDTO> {
    const user = await this.findUserRepo.find(loginUserDTORequest);

    return user;
  }

  async create(
    createUserRequestDTO: ICreateUserRequestDTO
  ): Promise<IFindUserRequestDTO> {
    const user = await this.createUserRepo.create(createUserRequestDTO);

    return user;
  }
}
