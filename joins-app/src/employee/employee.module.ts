// src/employee/employee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Department } from '../department/department.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])], // ✅ Required
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
// This code defines the EmployeeModule, which imports TypeOrmModule with Employee and Department entities.
// It also registers the EmployeeController and EmployeeService, making them available for dependency injection.
// The TypeOrmModule.forFeature method is used to specify which entities this module will work with, allowing the service to perform database operations on these entities.
// This is essential for the service to interact with the database using TypeORM.
// The EmployeeModule is now ready to be used in the application, allowing for operations related to employees and their relationships with departments.
// The EmployeeController will handle incoming requests related to employees, while the EmployeeService will contain the business logic for managing employees and their relationships with departments.
// This modular structure promotes separation of concerns and makes the codebase more maintainable and testable.
// The EmployeeModule can be imported into the main application module (AppModule) to integrate it with the rest of the application.
//// This allows the application to handle employee-related operations, such as creating, updating, and retrieving employee
