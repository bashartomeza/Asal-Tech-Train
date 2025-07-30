import fs from 'fs';
import path from 'path';
import { User } from '../types/type';

const DATA_FILE = path.join(__dirname, '../data/users.json');

export class UserService {
  private readData(): User[] {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  }

  private writeData(data: User[]): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  readAllUsers(): User[] {
    return this.readData();
  }
  getUserById(id: number): User | undefined{
    const users = this.readData();
    const user = users.find((u) => u.id === id);
    return user;
  }

  createUser(newUser: User): User {
    const users = this.readData();
    users.push(newUser);
    this.writeData(users);
    return newUser;
  }

  updateUser(id: number, updatedUser: User): User | undefined {
    const users = this.readData();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return undefined;
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    this.writeData(users);
    return users[userIndex];
  }

  deleteUser(id: number): boolean {
    const users = this.readData();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    this.writeData(users);
    return true;
  }

  
}
    
