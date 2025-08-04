
import { Users, User } from '../models/User.model';

export class UserService {
  async readAllUsers(): Promise<User[]> {
    return await Users.find({});
  }

  async getUserById(id: string): Promise<User | null> {
    return await Users.findById(id);
  }

 async createUser(user: User): Promise<User> {
    const createdUser = await Users.create(user);
    return createdUser;
  }


  async updateUser(id: string, updatedUser: Partial<User>): Promise<User | null> {
    return await Users.findByIdAndUpdate(id, updatedUser, { new: true });
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await Users.findByIdAndDelete(id);
    return !!result;
  }
}