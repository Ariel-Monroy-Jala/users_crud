import Router from '@koa/router';
import { cleanResponse } from '../middlewares/clean-response.js';
import { container } from '../container.js';

export const router = new Router();

const userController = container.resolve('userController');

router.get('/users/:id', cleanResponse, userController.getUser);
router.get('/users', cleanResponse, userController.getUsers);
router.post('/users', userController.crateUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/bulk', userController.bulkCreate);
