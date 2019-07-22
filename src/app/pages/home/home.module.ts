import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent, SafePipe } from './home.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';


@NgModule({
  declarations: [HomeComponent,SafePipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    JwSocialButtonsModule
  ]
})
export class HomeModule { }
