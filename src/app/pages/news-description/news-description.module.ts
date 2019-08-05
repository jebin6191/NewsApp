import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { NewsDescriptionComponent } from './news-description.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/shared/safe.pipe';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NewsDescriptionComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule,
    HttpClientModule,  
    HttpClientJsonpModule,
    ShareButtonsModule,
    JwSocialButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class NewsDescriptionModule { }
