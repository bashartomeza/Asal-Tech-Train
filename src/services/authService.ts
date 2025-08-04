import { Users, User } from '../models/User.model';
import mongoose from 'mongoose';

export class AuthService {

  async login(email: string, password: string): Promise<User | null> {
    const user = await Users.findOne({ email, password });
    return user;
  }

  async register(userData: Omit<User, '_id'>): Promise<User> {
    const user = new Users(userData);
    return await user.save();
  } 

  async getUserById(id: string): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
    return await Users.findById(id);
  }
  
}