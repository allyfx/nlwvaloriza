import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { CreateUserController } from './controllers/CreateUserController';
import { ListUsersController } from './controllers/ListUsersController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

import { CreateTagController } from './controllers/CreateTagController';
import { ListTagsController } from './controllers/ListTagsController';

import { CreateComplimentController } from './controllers/CreateComplimentController';

import { ListUserSendComplimentsController } from './controllers/LIstUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();

router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);
router.post('/sessions', authenticateUserController.handle);

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get('/tags', ensureAuthenticated, listTagsController.handle);

router.post('/compliments', ensureAuthenticated, createComplimentController.handle);

router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);

export { router };
