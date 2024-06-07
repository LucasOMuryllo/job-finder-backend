import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import bcrypt from 'bcryptjs';

export class AuthController {
  private userService = new UserService();
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const token = this.authService.generateToken(user.id);
      await this.authService.saveToken(user.id, token);

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
