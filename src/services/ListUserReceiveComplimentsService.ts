import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

class ListUserReceiveComplimentsService {
  async execute(user_id) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "tag"],
    });

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };
