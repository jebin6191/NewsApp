import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSearchResultsRoutingModule } from './news-search-results-routing.module';
import { NewsSearchResultsComponent } from './news-search-results.component';



@NgModule({
  declarations: [NewsSearchResultsComponent],
  imports: [
    CommonModule,
    NewsSearchResultsRoutingModule
  ]
})
export class NewsSearchResultsModule { }
