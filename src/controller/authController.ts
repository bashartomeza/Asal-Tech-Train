import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import {  User } from '../models/User.model';

const authService = new AuthService();

export class AuthController {

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      if (user) {
        console.log('User logged in:', user);
        res.status(200).render('profile', { user });
      } else {
        res.status(401).render('login', { error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).render('login', { error: 'Internal server error' });
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await authService.register(req.body as User);  
      res.status(201).render('profile', { user });
    } catch (error) {
      res.status(500).render('error', { message: 'Internal server error' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {  
    try {
      res.status(200).render('login');
    } catch (error) {
      res.status(500).render('error', { message: 'Internal server error' });
    }
  }

  async showProfilePage(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body.user; // Assuming user is set in session middleware
      if (user) {
        res.status(200).render('profile', { user });
      } else {
        res.status(401).render('login', { error: 'Please log in to view your profile' });
      }
    } catch (error) {
      res.status(500).render('error', { message: 'Internal server error' });
    }
  }

 async showLoginPage(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).render('login');
    } catch (error) {
      res.status(500).render('error', { message: 'Internal server error' });
    }
  }

  async showRegisterPage(req: Request, res: Response): Promise<void> {
      res.status(200).render('register');
      res.status(500).render('error', { message: 'Internal server error' });
  } 
  async showProfile(req: Request, res: Response): Promise<void> {  
    try {
      const userId = req.params.id;
      const user = await authService.getUserById(userId);
      if (user) {
        res.status(200).render('profile', { user });
      } else {
        res.status(404).render('error', { message: 'User not found' });
      }
    } catch (error) {
      res.status(500).render('error', { message: 'Internal server error' });
    }
  }
}

