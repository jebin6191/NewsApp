import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryComponent } from './news-category.component';
import { NewsCategoryRoutingModule } from './news-category-routing.module';



@NgModule({
  declarations: [
    NewsCategoryComponent
  ],
  imports: [
    CommonModule,
    NewsCategoryRoutingModule
  ]
})
export class NewsCategoryModule { }
