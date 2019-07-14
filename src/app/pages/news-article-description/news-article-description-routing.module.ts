import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsArticleDescriptionComponent } from './news-article-description.component';


const routes: Routes = [
  {
    path: '',
    component: NewsArticleDescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsArticleDescriptionRoutingModule { }
