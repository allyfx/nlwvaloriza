import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";

import userView from '../views/user_view';

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

    return userView.render(user);
  }
}

export { CreateUserService };
