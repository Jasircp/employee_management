import { Column, Entity, OneToOne, JoinColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
export enum EmployeeRole {
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PROBATION = 'PROBATION'
}

@Entity()
class Employee  extends AbstractEntity {

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    age: number

    @OneToOne(() => Address, (address) => address.employee, {
      cascade: true,
      onDelete: 'CASCADE'
    })
      address: Address

    @Column({
      type: 'enum',
      enum: EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole

    @Column()
    employeeId: string

    @Column()
    dateOfJoining: Date

    @Column()
    experience: number

    @Column({
      type: 'enum',
      enum: Status,
      default: Status.PROBATION
    })
    status: Status
}
  
export default Employee;
  