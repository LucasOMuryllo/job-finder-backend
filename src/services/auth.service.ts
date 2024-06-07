import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';
import config from '../config/env';

export class AuthService {
  saveToken(id: number, token: Promise<string>) {
    throw new Error('Method not implemented.');
  }
  private userRepository = AppDataSource.getRepository(User);

  async generateToken(userId: number): Promise<string> {
    return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });
  }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return null;
    }
  }
}
