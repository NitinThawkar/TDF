import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
   // CommonModule
  ],
  declarations: [],
  exports: [CommonModule,ReactiveFormsModule]
})
export class SharedModule { }
