import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsArticleDescriptionRoutingModule } from './news-article-description-routing.module';
import { NewsArticleDescriptionComponent, SafePipe1 } from './news-article-description.component';
import { ShareButtonsModule } from '@ngx-share/buttons';


@NgModule({
  declarations: [
    NewsArticleDescriptionComponent,
    SafePipe1
  ],
  imports: [
    CommonModule,
    NewsArticleDescriptionRoutingModule,
    ShareButtonsModule
  ]
})
export class NewsArticleDescriptionModule { }
