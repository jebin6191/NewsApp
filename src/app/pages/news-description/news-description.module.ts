import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { NewsDescriptionComponent } from './news-description.component';


@NgModule({
  declarations: [
    NewsDescriptionComponent,
  ],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule
  ]
})
export class NewsDescriptionModule { }
