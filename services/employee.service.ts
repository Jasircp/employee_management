import EmployeeRepository from "../repositories/employee_repository";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(email: string, name: string, age: number, address: CreateAddressDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeByID(id:number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id: number, updatedEmployee: CreateEmployeeDto) {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if(existingEmployee){
            const employee = new Employee();
            employee.name = updatedEmployee.name;
            employee.email = updatedEmployee.email;
            const updatedAddress = new Address();
            updatedAddress.line1 = updatedEmployee.address.line1;
            updatedAddress.pincode = updatedEmployee.address.pincode;
            await this.employeeRepository.update(id, employee);
        }

    }

    async deleteEmployee(id: number){
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if(existingEmployee){
            await this.employeeRepository.remove(existingEmployee);
        }
    }    
}

export default EmployeeService;