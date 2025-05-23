import { AuthService } from "../services/auth.service";
import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import HttpException from "../exception/httpException";

export class AuthController {
    constructor (
        private authService: AuthService,
        private router: Router
    ) {
        router.post("/login",this.login.bind(this));
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                throw new HttpException(400, "Email and password are required");
            }
            const data = await this.authService.login(email, password);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }

    }
}