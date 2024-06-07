"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../models/User");
const env_1 = __importDefault(require("../config/env"));
class AuthService {
    constructor() {
        this.userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
    }
    saveToken(id, token) {
        throw new Error('Method not implemented.');
    }
    async generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.jwtSecret, { expiresIn: '1h' });
    }
    async validateToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, env_1.default.jwtSecret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
