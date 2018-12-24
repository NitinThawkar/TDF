import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';

import { Router } from '@angular/router';



@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {

    this._employeeService.getEmployees().subscribe(
      (employeeList) => this.employees = employeeList,
      (err) => console.log(err)
    );

  }

  editButtonClick(employeeId: number) {
    this._router.navigate(['/edit', employeeId]);
  }

}
