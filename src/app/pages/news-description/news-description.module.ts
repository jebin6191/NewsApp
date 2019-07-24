import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { NewsDescriptionComponent } from './news-description.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewsDescriptionComponent,
  ],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule,
    JwSocialButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class NewsDescriptionModule { }
