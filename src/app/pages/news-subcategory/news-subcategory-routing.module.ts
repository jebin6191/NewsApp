import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsSubcategoryComponent } from './news-subcategory.component';

const routes: Routes = [
  {
    path: '',
    component: NewsSubcategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsSubcategoryRoutingModule { }