import { NextFunction, Request, Response, Router } from "express";                                                                
import EmployeeService from "../services/employee.service";
import HttpException from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";

class EmployeeController {

    constructor( private employeeService: EmployeeService, router: Router) {
        router.post("/", checkRole(EmployeeRole.HR), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", checkRole(EmployeeRole.HR), this.updateEmployee.bind(this));
        router.delete("/:id", checkRole(EmployeeRole.HR), this.deleteEmployee.bind(this));
    }

    async createEmployee(req: Request, res: Response, next:NextFunction ){
            try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedEmployee = await this.employeeService.createEmployee( createEmployeeDto);
            res.status(201).send(savedEmployee);
            } catch (error) {
            next(error);
            }
    }

    async getAllEmployees(req: Request, res: Response) {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeByID(id);
            if(!employee) {
                throw new HttpException(404,"Employee Not Found");
            }
            res.status(200).send(employee);
        } catch (error) {
            console.log(error);
            next(error);
        }
        
    }

    async updateEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const updatedEmployee = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(updatedEmployee);
            if(errors.length > 0){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
            await this.employeeService.updateEmployee(id,updatedEmployee);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    async deleteEmployee(req: Request, res: Response) {
        const id = Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(204).send();
    }

}

export default EmployeeController;