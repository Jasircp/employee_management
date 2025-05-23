import { MockProxy, mock } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee_repository"
import EmployeeService from "../../services/employee.service"
import Employee from "../../entities/employee.entity";
import { when } from 'jest-when'




describe('EmployeeService', () => {
    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;

    beforeEach(() => {
    //Create a type-safe mock of the repository
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
});

    describe('getEmployeeById', () => {

        it('should return value when user with proper id exists', async () => {
            const mockEmployee = { id: 123, name: "Employee name" } as Employee;
            when(employeeRepository.findOneBy).calledWith(123).mockReturnValue(mockEmployee);
            const result = await employeeService.getEmployeeByID(123);
            expect(employeeRepository.findOneBy).toHaveBeenCalledWith(123);
            expect(result).toStrictEqual(mockEmployee);
        });

        it('should throw error when user with provided id doesn not exist', async () => {
            //Arrange
            when(employeeRepository.findOneBy).calledWith(1).mockReturnValue(null);
            //Act
            expect(async () => await employeeService.getEmployeeByID(2)).rejects.toThrow("Employee not Found");
            //Asssert
            expect(employeeRepository.findOneBy).toHaveBeenCalledWith(2);
        });
    })
})