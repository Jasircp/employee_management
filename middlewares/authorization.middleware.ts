import { NextFunction, Request, Response } from "express"
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

// export const checkRole = (role:EmployeeRole) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const role = req.user?.role;
//         if(role !== EmployeeRole.HR)
//            throw new HttpException(403,"User has no privilege to access the resource");
//         next();
//     }   
// }

export const checkRole = (...roles: EmployeeRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        console.log(`Authorized roles:${roles}. Present role:${role}`)
        if(!roles.includes(role))
           throw new HttpException(403,"User has no privilege to access the resource");
        next();
    }   
}


// export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const role = req.user?.role;
//     if(role !== EmployeeRole.HR)
//         throw new HttpException(403,"User has no privilege to access the resource");
//     next();
// }