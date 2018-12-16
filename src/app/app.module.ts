import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule , routingComponents} from './/app-routing.module';
//import { ReactFromComponent } from './react-from/react-from.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
   // ReactFromComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
