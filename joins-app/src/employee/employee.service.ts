import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from '../department/department.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>, // TypeORM class used to handle database actions on the Employee table.

    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
  ) {}

  async seed() {
    //  1. Check if data already seeded
    const existing = await this.deptRepo.count();
    if (existing > 0) return 'Already seeded!';
    await this.employeeRepo.delete({});
    await this.deptRepo.delete({});

    //  2. Seed data
    // Create departments
    const hr = this.deptRepo.create({ name: 'HR' });
    const it = this.deptRepo.create({ name: 'IT' });
    await this.deptRepo.save([hr, it]);

    // Create Alice with department and save her first (manager)
    const alice = this.employeeRepo.create({
      name: 'Alice',
      salary: 50000,
      department: hr,
    });
    await this.employeeRepo.save(alice);

    // Create Bob (normal employee) and Charlie (reporting to Alice)
    const bob = this.employeeRepo.create({
      name: 'Bob',
      salary: 40000,
      department: it,
    });

    const charlie = this.employeeRepo.create({
      name: 'Charlie',
      salary: 45000,
      manager: alice, // self join
    });

    await this.employeeRepo.save([bob, charlie]);

    return 'Data seeded!';
  }

  async getInnerJoin() {
    return this.employeeRepo.query(`
      SELECT 
        row_to_json(e) AS employee,
        row_to_json(d) AS department
      FROM employee e
      INNER JOIN department d ON e."departmentId" = d.id;
    `);
  }

  async getLeftJoin() {
    return this.employeeRepo.query(`
      SELECT 
        row_to_json(e) AS employee,
        row_to_json(d) AS department
      FROM employee e
      LEFT JOIN department d ON e."departmentId" = d.id  
    `);
  } // employee.departmentId (foreign key) should match department.id (primary key).

  async getRightJoin() {
    return this.employeeRepo.query(`
      SELECT 
        row_to_json(d) AS department,
        row_to_json(e) AS employee
      FROM employee e
      RIGHT JOIN department d ON e."departmentId" = d.id
    `);
  }

  async getFullJoin() {
    return this.employeeRepo.query(`
      SELECT 
        row_to_json(e) AS employee,
        row_to_json(d) AS department
      FROM employee e
      FULL OUTER JOIN department d ON e."departmentId" = d.id
    `);
  }

  async getSelfJoin() {
    return this.employeeRepo.find({ relations: ['manager'] });
  }

  async innerJoinWithDepartment() {
    return this.employeeRepo
      .createQueryBuilder('emp')
      .innerJoinAndSelect('emp.department', 'dept')
      .getMany();
  }
  async getCrossJoin() {
    return this.employeeRepo.query(`
      SELECT 
        row_to_json(e) AS employee,
        row_to_json(d) AS department
      FROM employee e
      CROSS JOIN department d
    `);
  }
}
