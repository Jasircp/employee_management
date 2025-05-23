"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
// export const checkRole = (role:EmployeeRole) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const role = req.user?.role;
//         if(role !== EmployeeRole.HR)
//            throw new HttpException(403,"User has no privilege to access the resource");
//         next();
//     }   
// }
const checkRole = (...roles) => {
    return (req, res, next) => {
        var _a;
        const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        console.log(`Authorized roles:${roles}. Present role:${role}`);
        if (!roles.includes(role))
            throw new httpException_1.default(403, "User has no privilege to access the resource");
        next();
    };
};
exports.checkRole = checkRole;
// export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const role = req.user?.role;
//     if(role !== EmployeeRole.HR)
//         throw new HttpException(403,"User has no privilege to access the resource");
//     next();
// }
//# sourceMappingURL=authorization.middleware.js.map