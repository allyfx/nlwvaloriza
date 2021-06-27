import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';

import { CreateUserController } from './controllers/CreateUserController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

router.post('/tags', ensureAdmin, createTagController.handle);
router.post('/users', createUserController.handle);
router.post('/sessions', authenticateUserController.handle);
router.post('/compliments', createComplimentController.handle);

export { router };
