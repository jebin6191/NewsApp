import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSubcategoryComponent } from './news-subcategory.component';
import { NewsSubcategoryRoutingModule } from './news-subcategory-routing.module';



@NgModule({
  declarations: [
    NewsSubcategoryComponent
  ],
  imports: [
    CommonModule,
    NewsSubcategoryRoutingModule
  ]
})
export class NewsSubcategoryModule { }
