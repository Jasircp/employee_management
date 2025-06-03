import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    async findMany(): Promise<Employee[]> {
        return this.repository.find({
            relations: {
                address: true,
                department: true
            }
        });
    }

    async findOneBy(id: number): Promise<Employee> {
        return this.repository.findOne({ 
            where: {id},
            relations: {
                address: true,
                department: true
            }
        }); //same as {id: id}
    }

    async findByEmail(email: string): Promise<Employee> {
        return this.repository.findOneBy({email});
    }

    async update(id: number, employee: Employee): Promise<void> {
        await this.repository.save({id, ...employee});
    }

    async delete(id: number) {
        await this.repository.delete({ id });
    }

    async remove(employee: Employee): Promise<void> {
        await this.repository.softRemove(employee);
    }
}

export default EmployeeRepository;
