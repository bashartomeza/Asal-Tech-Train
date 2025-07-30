import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  getAll(req: Request, res: Response) {
    const users = userService.readAllUsers();
    res.render('users', { users }); // Pass to Handlebars
  }

  getById(req: Request, res: Response) {
    const user = userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }

  create(req: Request, res: Response) {
    userService.createUser(req.body);
    res.status(201).json(req.body);
  }

  update(req: Request, res: Response) {
    const user = userService.updateUser(Number(req.params.id), req.body);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  delete(req: Request, res: Response) {
    const deleted = userService.deleteUser(Number(req.params.id));
    deleted ? res.sendStatus(204) : res.status(404).send('User not found');
  }

 getAllUsers(req: Request, res: Response) {
    const users = userService.readAllUsers(); 
    console.log('Fetched users for rendering:', users);
    res.render('users', { users });
  }
}
