import express from 'express';
import { UserController } from '../controller/userControler';


const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


export default router;
// src/route/userRouter.ts






