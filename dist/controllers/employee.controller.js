"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exception/httpException"));
const class_transformer_1 = require("class-transformer");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const class_validator_1 = require("class-validator");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        router.post("/", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.updateEmployee.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.deleteEmployee.bind(this));
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeByID(id);
                if (!employee) {
                    throw new httpException_1.default(404, "Employee Not Found");
                }
                res.status(200).send(employee);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    updateEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const updatedEmployee = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updatedEmployee);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                yield this.employeeService.updateEmployee(id, updatedEmployee);
                res.status(201).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(204).send();
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map