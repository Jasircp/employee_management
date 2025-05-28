import DepartmentRepository from "../../repositories/department.repository"
import { Repository } from "typeorm";
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import Department from "../../entities/department.entity";

describe('DepartmentRepository', () => {
    let repository: MockProxy<Repository<Department>>;
    let departmentRepository: DepartmentRepository;

    beforeEach(() => {
        repository = mock<Repository<Department>>();
        departmentRepository = new DepartmentRepository(repository);
    });

    describe('create', () => {
        it("should save and return department", async () => {
            const mockDepartment = { id: 1, name: "HR" } as Department;
            when(repository.save).calledWith(mockDepartment).mockReturnValue(mockDepartment);

            const result = await departmentRepository.create(mockDepartment);

            expect(result).toEqual(mockDepartment);
            expect(repository.save).toHaveBeenCalledWith(mockDepartment);
        });
    });


    describe('findMany', () => {
        it("should return all departments", async () => {
            const mockDepartments = [
                { id: 1, name: "HR" } as Department,
                { id: 2, name: "IT" } as Department
            ];
            when(repository.find).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentRepository.findMany();

            expect(result).toEqual(mockDepartments);
            expect(repository.find).toHaveBeenCalledWith();
        });

        it("should return empty array when no departments exist", async () => {
            const mockDepartments: Department[] = [];
            when(repository.find).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentRepository.findMany();

            expect(result).toEqual(mockDepartments);
            expect(repository.find).toHaveBeenCalledWith();
        });
    });

    describe('update', () => {
        it("should call save on repository with id and department data", async () => {
            const id = 1;
            const mockDepartment = { id,name: "Updated Department" } as Department;
            const expectedSaveData = mockDepartment;
            when(repository.save).calledWith(expectedSaveData).mockReturnValue(Promise.resolve());

            await departmentRepository.update(id, mockDepartment);

            expect(repository.save).toHaveBeenCalledWith(expectedSaveData);
        });
    });

    describe('delete', () => {
        it("should call delete on repository with given id", async () => {
            const depId = 1;
            when(repository.delete).calledWith({ id: depId }).mockReturnValue(Promise.resolve());

            await departmentRepository.delete(depId);

            expect(repository.delete).toHaveBeenCalledWith({ id: depId });
        });
    });
});