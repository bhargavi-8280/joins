import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Department } from '../department/department.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: true,
  })
  department: Department;

  @ManyToOne(() => Employee, (emp) => emp.subordinates, { nullable: true })
  manager: Employee;

  @OneToMany(() => Employee, (emp) => emp.manager)
  subordinates: Employee[];
}
