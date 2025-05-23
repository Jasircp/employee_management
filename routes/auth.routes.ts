import { AuthController } from "../controllers/auth.controller";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee_repository";
import { AuthService } from "../services/auth.service";
import express from "express";
import EmployeeService from "../services/employee.service";

const authRouter = express.Router();

const repository = datasource.getRepository(Employee);
const employeeRepository = new EmployeeRepository(repository);
const employeeService = new EmployeeService(employeeRepository);
const authService = new AuthService(employeeService);
new AuthController(authService, authRouter);

export default authRouter;
