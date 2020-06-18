import fs from "fs";
import path from "path";
import { ICreateUserRepo } from "@domain/user/repositories/ICreateUserRepo";
import { ICreateUserRequestDTO } from "@domain/user/dto/ICreateUserRequestDTO";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";

export class CreateUserRepo implements ICreateUserRepo {
  public async create(
    createUserRequestDTO: ICreateUserRequestDTO
  ): Promise<IFindUserRequestDTO> {
    try {
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

      var maxId = users.data.reduce((acc, curr) => Math.max(acc, curr.id), 0);
      const newId = maxId + 1;

      const newUsers = {
        data: [
          ...users.data,
          {
            id: newId,
            ...createUserRequestDTO,
          },
        ],
      };

      fs.writeFileSync(path.join(filePath), JSON.stringify(newUsers));

      const user = {
        id: newId,
      };

      return user;
    } catch {
      throw new Error("User creation failed");
    }
  }
}
