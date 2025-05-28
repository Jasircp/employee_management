import { CreateDepartmentDto } from "../dto/create-department.dto";
import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";



class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

    async createDepartment(deptName: CreateDepartmentDto): Promise<Department> {
        const newDepartment = new Department();
        newDepartment.name = deptName.name;
        return this.departmentRepository.create(newDepartment);
    }

    async getAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department> {
        let department = await this.departmentRepository.findOneBy(id);
        if(!department) 
            throw new Error("Department Not Found");
        return department;
    }

    async updateDepartment(id: number, updatedDepartment: CreateDepartmentDto) {
        const existingDepartment = await this.departmentRepository.findOneBy(id);
        if(existingDepartment){
            const department = new Department();
            department.name = updatedDepartment.name;
            await this.departmentRepository.update(id, department);
        }
    }

    async deleteDepartment(id: number) {
        const existingDepartment = await this.departmentRepository.findOneBy(id);
        if(existingDepartment)
            await this.departmentRepository.remove(existingDepartment);
    }
}

export default DepartmentService;