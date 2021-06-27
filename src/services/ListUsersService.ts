import { getCustomRepository } from "typeorm";
import { classToClass } from "class-transformer";
import { UserRepository } from "../repositories/UserRepository";

class ListUsersService {
  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return classToClass(users);
  }
}

export { ListUsersService };
