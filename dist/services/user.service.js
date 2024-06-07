"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor() {
        this.userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
    }
    async createUser(name, email, password) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = this.userRepository.create({ name, email, password: hashedPassword });
        return this.userRepository.save(newUser);
    }
    async findUserByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
}
exports.UserService = UserService;
