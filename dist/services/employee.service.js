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
const bcrypt_1 = __importDefault(require("bcrypt"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    // async createEmployee(email: string, name: string, age: number, address: CreateAddressDto, password: string, role:EmployeeRole, dateOfJoining: Date,
    //     em
    // ): Promise<Employee> {
    //     const newAddress = new Address();
    //     newAddress.line1 = address.line1;
    //     newAddress.pincode = address.pincode;
    //     newAddress.line2 = address.line2;
    //     newAddress.houseNo = address.houseNo;
    //     const newEmployee = new Employee();
    //     newEmployee.name = name;
    //     newEmployee.email = email;
    //     newEmployee.age = age;
    //     newEmployee.role = role;
    //     newEmployee.address = newAddress;
    //     newEmployee.password = await bcrypt.hash(password, 10);
    //     return this.employeeRepository.create(newEmployee);
    // }
    createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.default();
            newAddress.line1 = employee.address.line1;
            newAddress.pincode = employee.address.pincode;
            newAddress.line2 = employee.address.line2;
            newAddress.houseNo = employee.address.houseNo;
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = employee.name;
            newEmployee.email = employee.email;
            newEmployee.password = yield bcrypt_1.default.hash(employee.password, 10);
            newEmployee.age = employee.age;
            newEmployee.role = employee.role;
            newEmployee.employeeId = employee.employeeId;
            newEmployee.dateOfJoining = employee.dateOfJoining;
            newEmployee.experience = employee.experience;
            newEmployee.status = employee.status;
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
            let employee = yield this.employeeRepository.findOneBy(id);
            if (!employee)
                throw new Error("Employee not Found");
            return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findByEmail(email);
        });
    }
    updateEmployee(id, updatedEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneBy(id);
            if (existingEmployee) {
                const employee = new employee_entity_1.default();
                employee.name = updatedEmployee.name;
                employee.email = updatedEmployee.email;
                employee.age = updatedEmployee.age;
                employee.password = yield bcrypt_1.default.hash(updatedEmployee.password, 10);
                employee.role = updatedEmployee.role;
                employee.dateOfJoining = updatedEmployee.dateOfJoining;
                employee.employeeId = updatedEmployee.employeeId;
                employee.experience = updatedEmployee.experience;
                employee.status = updatedEmployee.status;
                const updatedAddress = new address_entity_1.default();
                updatedAddress.line1 = updatedEmployee.address.line1;
                updatedAddress.pincode = updatedEmployee.address.pincode;
                updatedAddress.line2 = updatedEmployee.address.line2;
                updatedAddress.houseNo = updatedEmployee.address.houseNo;
                updatedAddress.id = existingEmployee.address.id;
                employee.address = updatedAddress;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneBy(id);
            if (existingEmployee) {
                yield this.employeeRepository.remove(existingEmployee);
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map