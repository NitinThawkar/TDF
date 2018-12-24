import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module'; // user define module
import { EmployeeModule } from './employee/employee.module'; // user define module

import { EmployeeService } from './employee/employee.service';

import { AppComponent } from './app.component';
import { TDFFormComponent } from './tdf-form/tdf-form.component';

//import { ReactFromComponent } from './react-from/react-from.component';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TDFFormComponent,
    
    HomeComponent,
    PageNotFoundComponent
    // ReactFromComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EmployeeModule,
    AppRoutingModule    
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
