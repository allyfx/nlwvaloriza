import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { classToClass } from "class-transformer";
import { UserRepository } from "../repositories/UserRepository";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: UserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    });

    await userRepository.save(user);

    return classToClass(user);
  }
}

export { CreateUserService };
