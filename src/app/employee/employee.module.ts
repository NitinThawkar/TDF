import { NgModule } from '@angular/core';  // custome module  user define module
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CreateEmployeeComponent, ListEmployeeComponent]
})
export class EmployeeModule { }
