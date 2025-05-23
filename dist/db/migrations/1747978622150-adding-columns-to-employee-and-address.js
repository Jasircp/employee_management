"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnsToEmployeeAndAddress1747978622150 = void 0;
class AddingColumnsToEmployeeAndAddress1747978622150 {
    constructor() {
        this.name = 'AddingColumnsToEmployeeAndAddress1747978622150';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying `);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
            yield queryRunner.query(`UPDATE "address" SET "house_no" = 123 WHERE "house_no" IS NULL`);
            yield queryRunner.query(`UPDATE "address" SET "line2" = 'adddress line 2' WHERE "line2" IS NULL`);
            yield queryRunner.query(`UPDATE "employee" SET "employee_id" = 'KV100' WHERE "employee_id" IS NULL`);
            yield queryRunner.query(`UPDATE "employee" SET "date_of_joining" = '2025-01-01' WHERE "date_of_joining" IS NULL`);
            yield queryRunner.query(`UPDATE "employee" SET "experience" = 1 WHERE "experience" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);
            yield queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'PROBATION'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        });
    }
}
exports.AddingColumnsToEmployeeAndAddress1747978622150 = AddingColumnsToEmployeeAndAddress1747978622150;
//# sourceMappingURL=1747978622150-adding-columns-to-employee-and-address.js.map