import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";
import { IFindUserResponseDTO } from "@domain/user/dto/IFindUserResponseDTO";

export interface IFindUserRepo {
  find: (
    loginUserRequestDTO: IFindUserRequestDTO
  ) => Promise<IFindUserResponseDTO>;
}
