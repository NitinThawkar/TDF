import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import {ReactFromComponent} from './react-from/react-from.component';

const routes: Routes = [
  { path: 'react', component: ReactFromComponent }
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
export const routingComponents = [ReactFromComponent];
//import { ReactFromComponent } from './react-from/react-from.component';