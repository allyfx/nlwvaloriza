import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import userView from '../views/user_view';

interface AuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      email,
    })

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email
    }, "08b013376068230773ad80db0fe929b3", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user: userView.render(user),
      token
    }
  }
}

export { AuthenticateUserService };
