import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CareersComponent],
  imports: [
    CommonModule,
    CareersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CareersModule { }
