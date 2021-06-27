import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface ComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: ComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const userRepository = getCustomRepository(UserRepository);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    const userReceiverExists = await userRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists");
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    })

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
