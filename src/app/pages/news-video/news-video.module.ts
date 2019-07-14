import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsVideoRoutingModule } from './news-video-routing.module';
import { NewsVideoComponent } from './news-video.component';


@NgModule({
  declarations: [
    NewsVideoComponent
  ],
  imports: [
    CommonModule,
    NewsVideoRoutingModule
  ]
})
export class NewsVideoModule { }
