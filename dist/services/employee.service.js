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
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const address_entity_1 = __importDefault(require("../entities/address.entity"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    createEmployee(email, name, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.address = newAddress;
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneById(id);
        });
    }
    updateEmployee(id, updatedEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                const employee = new employee_entity_1.default();
                employee.name = updatedEmployee.name;
                employee.email = updatedEmployee.email;
                const updatedAddress = new address_entity_1.default();
                updatedAddress.line1 = updatedEmployee.address.line1;
                updatedAddress.pincode = updatedEmployee.address.pincode;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                yield this.employeeRepository.remove(existingEmployee);
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map