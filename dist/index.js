"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ormconfig_1 = require("./config/ormconfig");
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    app_1.default.listen(env_1.default.port, () => {
        console.log(`Server is running on port ${env_1.default.port}`);
    });
})
    .catch((error) => {
    console.error('Error during Data Source initialization:', error);
});
