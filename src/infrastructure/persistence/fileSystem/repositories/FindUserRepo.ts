import fs from "fs";
import path from "path";
import { IFindUserRepo } from "@domain/user/repositories/IFindUserRepo";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";
import { IFindUserResponseDTO } from "@domain/user/dto/IFindUserResponseDTO";

export class FindUserRepo implements IFindUserRepo {
  public async find(
    findUserRequestDTO: IFindUserRequestDTO
  ): Promise<IFindUserResponseDTO | undefined> {
    const filePath = path.join(
      process.cwd(),
      "src",
      "infrastructure",
      "persistence",
      "fileSystem",
      "data",
      "users.json"
    );

    const users = JSON.parse(fs.readFileSync(filePath).toString());

    const response = users.data.find(
      (item) =>
        item.name === findUserRequestDTO?.name ||
        item.id === findUserRequestDTO?.id
    );

    return response;
  }
}
