"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.authService = new auth_service_1.AuthService();
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.findUserByEmail(email);
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            const token = this.authService.generateToken(user.id);
            await this.authService.saveToken(user.id, token);
            res.json({ token });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.AuthController = AuthController;
