import EmployeeRepository from "../../repositories/employee_repository";
import { Repository } from "typeorm";
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import Employee from "../../entities/employee.entity";

describe('EmployeeRepository', () => {
    let repository: MockProxy<Repository<Employee>>;
    let employeeRepository: EmployeeRepository;

    beforeEach(() => {
        repository = mock<Repository<Employee>>();
        employeeRepository = new EmployeeRepository(repository);
    });

    describe('create', () => {
        it("should save and return employee", async () => {
            const mockEmployee = { id: 1, name: "Employee name" } as Employee;
            when(repository.save).calledWith(mockEmployee).mockReturnValue(mockEmployee);

            const result = await employeeRepository.create(mockEmployee);

            expect(result).toEqual(mockEmployee);
            expect(repository.save).toHaveBeenCalledWith(mockEmployee);
        });
    });

    describe('findMany', () => {
        it("should return all employees with relations", async () => {
            const mockEmployees = [
                { id: 1, name: "Employee 1" } as Employee,
                { id: 2, name: "Employee 2" } as Employee
            ];
            when(repository.find).calledWith({
                relations: {
                    address: true,
                    department: true
                }
            }).mockReturnValue(mockEmployees);

            const result = await employeeRepository.findMany();

            expect(result).toEqual(mockEmployees);
            expect(repository.find).toHaveBeenCalledWith({
                relations: {
                    address: true,
                    department: true
                }
            });
        });

        it("should return empty array when no employees exist", async () => {
            const mockEmployees: Employee[] = [];
            when(repository.find).calledWith({
                relations: {
                    address: true,
                    department: true
                }
            }).mockReturnValue(mockEmployees);

            const result = await employeeRepository.findMany();

            expect(result).toEqual(mockEmployees);
            expect(repository.find).toHaveBeenCalledWith({
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    });

    describe('findOneById', () => {
        it("should return employee when found by id", async () => {
            const empId = 123;
            const mockEmployee = { id: empId, name: "Employee name" } as Employee;
            when(repository.findOne).calledWith({
                where: { id: empId },
                relations: {
                    address: true
                }
            }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findOneBy(empId);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: empId },
                relations: {
                    address: true
                }
            });
        });

        it("should return null when employee not found by id", async () => {
            const empId = 123;
            const mockEmployee = null;
            when(repository.findOne).calledWith({
                where: { id: empId },
                relations: {
                    address: true
                }
            }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findOneBy(empId);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: empId },
                relations: {
                    address: true
                }
            });
        });
    });

    describe('findByEmail', () => {
        it("should return employee when found by email", async () => {
            const email = "test@example.com";
            const mockEmployee = { id: 1, email: email } as Employee;
            when(repository.findOneBy).calledWith({ email }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findByEmail(email);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOneBy).toHaveBeenCalledWith({ email });
        });

        it("should return null when employee not found by email", async () => {
            const email = "nonexistent@example.com";
            const mockEmployee = null;
            when(repository.findOneBy).calledWith({ email }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findByEmail(email);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOneBy).toHaveBeenCalledWith({ email });
        });
    });

    describe('delete', () => {
        it("should call delete on repository with given id", async () => {
            const empId = 1;
            when(repository.delete).calledWith({ id: empId }).mockReturnValue(Promise.resolve());

            await employeeRepository.delete(empId);

            expect(repository.delete).toHaveBeenCalledWith({ id: empId });
        });
    });

    describe('remove', () => {
        it("should call remove on repository with given employee", async () => {
            const mockEmployee = { id: 1, name: "Employee name" } as Employee;
            when(repository.remove).calledWith(mockEmployee).mockReturnValue(Promise.resolve());

            await employeeRepository.remove(mockEmployee);

            expect(repository.remove).toHaveBeenCalledWith(mockEmployee);
        });
    });

    describe('update', () => {
        it("should call save on repository with id and employee data", async () => {
            const id = 1;
            const mockEmployee = { id,name: "Updated Employee" } as Employee;
            const expectedSaveData = mockEmployee ;
            when(repository.save).calledWith(expectedSaveData).mockReturnValue(Promise.resolve());

            await employeeRepository.update(id, mockEmployee);

            expect(repository.save).toHaveBeenCalledWith(expectedSaveData);
        });
    });
});
