import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(req, res) {
    const { tag_id, user_receiver, user_sender, message } = req.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    return res.status(201).json(compliment);
  }
}

export { CreateComplimentController };
