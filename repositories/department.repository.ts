import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";

class DepartmentRepository {
    constructor( private repository: Repository<Department>) {}

    async create(department: Department): Promise<Department> {
        return this.repository.save(department);
    }

    async findMany(): Promise<Department[]> {
        return this.repository.find();
    }

    async findOneBy(id: number): Promise<Department> {
        return this.repository.findOne({
            where: {id}
        })
    }

    async update(id: number, department: Department): Promise<void> {
        await this.repository.save({id,...department});
    }

    async remove(department: Department): Promise<void> {
        await this.repository.remove(department);
    }
}

export default DepartmentRepository;