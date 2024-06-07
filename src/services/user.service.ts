import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, email, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}