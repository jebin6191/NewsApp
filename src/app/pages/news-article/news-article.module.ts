import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleRoutingModule } from './news-article-routing.module';
import { NewsArticleComponent } from './news-article.component';




@NgModule({
  declarations: [
    NewsArticleComponent
  ],
  imports: [
    CommonModule,
    NewsArticleRoutingModule
  ]
})
export class NewsArticleModule { }
