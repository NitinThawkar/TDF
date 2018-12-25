import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule , PreloadAllModules, NoPreloading} from '@angular/router';

import {ReactFromComponent} from './react-from/react-from.component';
import {TDFFormComponent} from './tdf-form/tdf-form.component';


import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
    // home route
  { path: 'home', component: HomeComponent },
  { path: 'react', component: ReactFromComponent },
  { path: 'TDF', component: TDFFormComponent },
 
 // redirect to the home route if the client side route path is empty
 { path: '', redirectTo: '/home', pathMatch: 'full' },

 { path: 'employees', loadChildren: './employee/employee.module#EmployeeModule' }, // part 36
 // wild card route
 { path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) //part 37
    //RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading }) //part 37
  ],
  exports : [RouterModule]
  ,
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [ReactFromComponent, TDFFormComponent ];
