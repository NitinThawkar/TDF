import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './/app-routing.module';
import { TDFFormComponent } from './tdf-form/tdf-form.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
//import { ReactFromComponent } from './react-from/react-from.component';

import { EmployeeService } from './employee/employee.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TDFFormComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent
    // ReactFromComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
