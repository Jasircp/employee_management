import DepartmentService from "../services/department.service";
import { checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { NextFunction, Request, Response, Router } from "express"; 
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { validate } from "class-validator";
import HttpException from "../exception/httpException";


class DepartmentController {
    constructor( private departmentService: DepartmentService, router: Router) {
        router.post("/", checkRole(EmployeeRole.HR), this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", checkRole(EmployeeRole.HR), this.updateDepartment.bind(this));
        router.delete("/:id",checkRole(EmployeeRole.HR), this.deleteDepartment.bind(this));
    }

    async createDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if(errors.length > 0){
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedDepartment = await this.departmentService.createDepartment(createDepartmentDto);
            res.status(201).send(savedDepartment);
        } catch (error) {
            next(error);
        }
    }

    async getAllDepartments(req: Request, res: Response) {
        const departments = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id= Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(id);
            if(!department)
                throw new HttpException(404,"Department Not Found");
            res.status(200).send(department);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    async updateDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const updatedDepartment = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(updatedDepartment);
            if(errors.length > 0){
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            await this.departmentService.updateDepartment(id,updatedDepartment);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    async deleteDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await this.departmentService.deleteDepartment(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default DepartmentController;