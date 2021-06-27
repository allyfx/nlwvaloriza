import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

class ListUserSendComplimentService {
  async execute(user_id) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        user_sender: user_id,
      },
      relations: ["userReceiver", "tag"]
    });

    return compliments;
  }
}

export { ListUserSendComplimentService };
