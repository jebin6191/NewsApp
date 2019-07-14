import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsArticleDescriptionRoutingModule } from './news-article-description-routing.module';
import { NewsArticleDescriptionComponent } from './news-article-description.component';


@NgModule({
  declarations: [
    NewsArticleDescriptionComponent
  ],
  imports: [
    CommonModule,
    NewsArticleDescriptionRoutingModule
  ]
})
export class NewsArticleDescriptionModule { }
