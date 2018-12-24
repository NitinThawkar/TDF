import { NgModule } from '@angular/core';  // custome module  user define module
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {EmployeeRoutingModule} from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ],
  declarations: [CreateEmployeeComponent, ListEmployeeComponent]
})
export class EmployeeModule { }
