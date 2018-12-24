import { NgModule } from '@angular/core';  // custome module  user define module
//import { CommonModule } from '@angular/common'; //moved to shared module
//import { ReactiveFormsModule } from '@angular/forms'; //moved to shared module

import {EmployeeRoutingModule} from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    //CommonModule, //moved to shared module
   // ReactiveFormsModule, //moved to shared module
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [CreateEmployeeComponent, ListEmployeeComponent]
})
export class EmployeeModule { }
