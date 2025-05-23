import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested, IsDate, IsDateString } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, Status } from "../entities/employee.entity";

import { CreateDepartmentDto } from "./create-department.dto";
export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @IsNotEmpty()
  @IsString()
  employeeId: string

  @IsNotEmpty()
  @IsDateString()
  dateOfJoining: Date

  @IsNotEmpty()
  @IsNumber()
  experience: number

  @IsEnum(Status)
  status: Status

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

 }