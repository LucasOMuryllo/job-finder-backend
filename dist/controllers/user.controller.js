"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = await this.userService.createUser(name, email, password);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.UserController = UserController;
