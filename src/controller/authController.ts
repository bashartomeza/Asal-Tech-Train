import { Request, Response } from 'express';
import {AuthService} from '../services/authService';

const authService = new AuthService();
export class AuthController {
  showLoginPage(req: Request, res: Response) {
    res.render('login');
  }

  showRegisterPage(req: Request, res: Response) {
    res.render('register');
  }

  login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = authService.Login(email, password);
    if (user) {
    // ✅ Redirect to /profile/11 (e.g.)
    res.redirect(`/auth/profile/${user.id}`);
  } else {
    res.render('login', { error: 'Invalid email or password' });
  }
}

showProfile(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.redirect('/auth/login');
  }

  const user = authService.getUserById(id);

  if (user) {
    res.render('profile', { user });
  } else {
    res.redirect('/auth/login');
  }
}
  showProfileById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const users = authService.readData();
  if (isNaN(userId)) {
  const user = users.find(u => u.id === userId);

  if (user) {
    res.render('profile', { user });
  } else {
    res.redirect('/auth/login');
  }
}

  }
  
  register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const users = authService.readData();
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password
    };
    authService.register(newUser);
    res.redirect('/auth/login');
  }
}