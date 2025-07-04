import { Controller, Get } from '@nestjs/common';

import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Get('seed')
  seedData() {
    return this.empService.seed();
  }
  @Get('inner')
  inner() {
    return this.empService.getInnerJoin();
  }

  @Get('left')
  left() {
    return this.empService.getLeftJoin();
  }

  @Get('right')
  right() {
    return this.empService.getRightJoin();
  }

  @Get('full')
  full() {
    return this.empService.getFullJoin();
  }

  @Get('self')
  self() {
    return this.empService.getSelfJoin();
  }

  @Get('department')
  getEmployeesWithDepartment() {
    return this.empService.innerJoinWithDepartment();
  }
  @Get('cross')
  getCrossJoin() {
    return this.empService.getCrossJoin();
  }
}
