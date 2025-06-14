"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_repository_1 = __importDefault(require("../repositories/employee_repository"));
const auth_service_1 = require("../services/auth.service");
const express_1 = __importDefault(require("express"));
const employee_service_1 = __importDefault(require("../services/employee.service"));
const authRouter = express_1.default.Router();
const repository = data_source_1.default.getRepository(employee_entity_1.default);
const employeeRepository = new employee_repository_1.default(repository);
const employeeService = new employee_service_1.default(employeeRepository);
const authService = new auth_service_1.AuthService(employeeService);
new auth_controller_1.AuthController(authService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map