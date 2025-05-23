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
const department_entity_1 = __importDefault(require("../entities/department.entity"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    createDepartment(deptName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = deptName;
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let department = yield this.departmentRepository.findOneBy(id);
            if (!department)
                throw new Error("Department Not Found");
            return department;
        });
    }
    updateDepartment(id, updatedDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneBy(id);
            if (existingDepartment) {
                const department = new department_entity_1.default();
                department.name = updatedDepartment.name;
                yield this.departmentRepository.update(id, department);
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneBy(id);
            if (existingDepartment)
                yield this.departmentRepository.remove(existingDepartment);
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map