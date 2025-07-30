import { User } from '../types/type';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '../data/users.json');

export class AuthService {
  public readData(): User[] {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  }

  public writeData(data: User[]): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  Login(email: string, password: string): User | undefined {
    const users = this.readData();
    const user = users.find((u) => u.email === email && u.password === password);
    return user;
  }

getUserById(id: number): Omit<User, 'password'> | null {
  const users = this.readData();
  const user = users.find(u => u.id === id);
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}


  register(user: User): void {
    const users = this.readData();
    users.push(user);
    this.writeData(users);
  }
  
}