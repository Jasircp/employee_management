import express from "express";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee_repository";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";
import datasource from "../db/data-source";

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const employeeService = new EmployeeService(employeeRepository);
new EmployeeController(employeeService, employeeRouter);

export default employeeRouter;