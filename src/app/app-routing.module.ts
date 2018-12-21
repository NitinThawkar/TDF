import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import {ReactFromComponent} from './react-from/react-from.component';
import {TDFFormComponent} from './tdf-form/tdf-form.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';

const routes: Routes = [
  { path: 'react', component: ReactFromComponent },
  { path: 'TDF', component: TDFFormComponent },
  { path: 'list', component: ListEmployeeComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
  ,
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [ReactFromComponent, TDFFormComponent ];
//import { ReactFromComponent } from './react-from/react-from.component';