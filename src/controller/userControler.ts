import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async getAll (req: Request, res: Response) {
    const users =await userService.readAllUsers();
    res.render('users', { users }); // Pass to Handlebars
  }

  async getById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }
  async create(req: Request, res: Response) {
    const newUser = req.body;
    const user = await userService.createUser(newUser);
    res.status(201).json(user);
  }


  async update(req: Request, res: Response) { 
    const updatedUser = req.body;
    const user = await userService.updateUser(req.params.id, updatedUser);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const success = await userService.deleteUser(req.params.id);
    if (!success) return res.status(404).send('User not found');
    res.status(204).send();
  }

  
}

