import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';

//  Part 35
// const empRoutes: Routes = [
//   {
//     path: 'employees',
//     children: [
//       { path: 'list', component: ListEmployeeComponent },
//       { path: '', component: ListEmployeeComponent },
//       { path: 'create', component: CreateEmployeeComponent },
//       { path: 'edit/:id', component: CreateEmployeeComponent },
//     ]
//   }
// ];

//  Part 36
const empRoutes: Routes = [
  { path: '', component: ListEmployeeComponent },
  { path: 'list', component: ListEmployeeComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(empRoutes)
  ],
  exports : [RouterModule]
  ,
  declarations: []
})
export class EmployeeRoutingModule { }
