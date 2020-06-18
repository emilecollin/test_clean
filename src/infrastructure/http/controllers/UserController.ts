import express, { Request, Response, NextFunction } from "express";
import { FindUserRepo } from "@infrastructure/persistence/fileSystem/repositories/FindUserRepo";
import { CreateUserRepo } from "@infrastructure/persistence/fileSystem/repositories/CreateUserRepo";
import { IFindUserRequestDTO } from "@domain/user/dto/IFindUserRequestDTO";
import { FindUserAdapter } from "@infrastructure/http/adapters/FindUserAdapter";
import { CreateUserAdapter } from "@infrastructure/http/adapters/CreateUserAdapter";
import { FindUserUseCase } from "@domain/user/useCases/FindUserUseCase";
import { CreateUserUseCase } from "@domain/user/useCases/CreateUserUseCase";
import { ICreateUserRequestDTO } from "@domain/user/dto/ICreateUserRequestDTO";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const findUserRequestDTO: IFindUserRequestDTO = req.body;

    const findUserRepo = new FindUserRepo();
    const findUserUseCase = new FindUserUseCase(findUserRepo);
    const findUserAdapter = new FindUserAdapter(
      findUserUseCase,
      findUserRequestDTO
    );

    const user = await findUserAdapter.find();

    return res.json({ user }).end();
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserRequestDTO: ICreateUserRequestDTO = req.body;

    const findUserRepo = new FindUserRepo();
    const createUserRepo = new CreateUserRepo();
    const createUserUseCase = new CreateUserUseCase(
      createUserRepo,
      findUserRepo
    );
    const createUserAdapter = new CreateUserAdapter(
      createUserUseCase,
      createUserRequestDTO
    );

    const user = await createUserAdapter.create();

    return res.json({ user }).end();
  } catch (err) {
    return next(err);
  }
});

export default router;
