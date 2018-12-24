import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import {ReactFromComponent} from './react-from/react-from.component';
import {TDFFormComponent} from './tdf-form/tdf-form.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
    // home route
  { path: 'home', component: HomeComponent },

  { path: 'react', component: ReactFromComponent },
  { path: 'TDF', component: TDFFormComponent },
  { path: 'list', component: ListEmployeeComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
 // redirect to the home route if the client side route path is empty
 { path: '', redirectTo: '/home', pathMatch: 'full' },
 // wild card route
 { path: '**', component: PageNotFoundComponent }

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