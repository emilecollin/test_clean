import { ICreateUserRequestDTO } from "@domain/user/dto/ICreateUserRequestDTO";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";

export interface ICreateUserRepo {
  create: (
    loginUserRequestDTO: ICreateUserRequestDTO
  ) => Promise<IFindUserRequestDTO>;
}
