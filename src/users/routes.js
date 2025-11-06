import Router from "@koa/router";
import { userController } from "./controller.js";
import { cleanResponse } from "../middlewares/clean-response.js";

export const router = new Router();

router.get('/users/:id', userController.getUser);
router.get('/users', cleanResponse, userController.getUsers);
router.post('/users',userController.crateUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id',userController.deleteUser);