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
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
const class_transformer_1 = require("class-transformer");
const create_department_dto_1 = require("../dto/create-department.dto");
const class_validator_1 = require("class-validator");
const httpException_1 = __importDefault(require("../exception/httpException"));
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        router.post("/", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.updateDepartment.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.checkRole)(employee_entity_1.EmployeeRole.HR), this.deleteDepartment.bind(this));
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createDepartmentDto = (0, class_transformer_1.plainToInstance)(create_department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedDepartment = yield this.departmentService.createDepartment(createDepartmentDto);
                res.status(201).send(savedDepartment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentService.getAllDepartments();
            res.status(200).send(departments);
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const department = yield this.departmentService.getDepartmentById(id);
                if (!department)
                    throw new httpException_1.default(404, "Department Not Found");
                res.status(200).send(department);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    updateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const updatedDepartment = (0, class_transformer_1.plainToInstance)(create_department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updatedDepartment);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                yield this.departmentService.updateDepartment(id, updatedDepartment);
                res.status(201).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.departmentService.deleteDepartment(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map