import EmployeeRepository from "../repositories/employee_repository";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import bcrypt from 'bcrypt';
import HttpException from "../exception/httpException";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

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

    async createEmployee(employee: CreateEmployeeDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = employee.address.line1;
        newAddress.pincode = employee.address.pincode;
        newAddress.line2 = employee.address.line2;
        newAddress.houseNo = employee.address.houseNo;
        const newEmployee = new Employee();
        newEmployee.name = employee.name;
        newEmployee.email = employee.email;
        newEmployee.password = await bcrypt.hash(employee.password, 10);
        newEmployee.age = employee.age;
        newEmployee.role = employee.role;
        newEmployee.employeeId = employee.employeeId;
        newEmployee.dateOfJoining = employee.dateOfJoining;
        newEmployee.experience = employee.experience;
        newEmployee.status = employee.status;
        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeByID(id:number): Promise<Employee> {
        let employee = await this.employeeRepository.findOneBy(id);
        if(!employee)
            throw new Error("Employee not Found");
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findByEmail(email);
    }

    async updateEmployee(id: number, updatedEmployee: CreateEmployeeDto) {
        const existingEmployee = await this.employeeRepository.findOneBy(id);
        if(existingEmployee){
            const employee = new Employee();
            employee.name = updatedEmployee.name;
            employee.email = updatedEmployee.email;
            employee.age = updatedEmployee.age;
            employee.password = await bcrypt.hash(updatedEmployee.password,10);
            employee.role = updatedEmployee.role;
            employee.dateOfJoining = updatedEmployee.dateOfJoining;
            employee.employeeId = updatedEmployee.employeeId;
            employee.experience = updatedEmployee.experience;
            employee.status = updatedEmployee.status
            const updatedAddress = new Address();
            updatedAddress.line1 = updatedEmployee.address.line1;
            updatedAddress.pincode = updatedEmployee.address.pincode;
            updatedAddress.line2 = updatedEmployee.address.line2;
            updatedAddress.houseNo = updatedEmployee.address.houseNo;
            updatedAddress.id = existingEmployee.address.id; // so that existing employees adddress is updated instead of new address entry created
            employee.address = updatedAddress;
            await this.employeeRepository.update(id, employee);
        }

    }

    async deleteEmployee(id: number){
        const existingEmployee = await this.employeeRepository.findOneBy(id);
        if(existingEmployee){
            await this.employeeRepository.remove(existingEmployee);
        }
    }    
}

export default EmployeeService;