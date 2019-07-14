import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent, SafePipe } from './home.component';



@NgModule({
  declarations: [HomeComponent,SafePipe],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
