import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeService } from './service/home.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsVideoComponent } from './pages/news-video/news-video.component';
import { NewsArticleDescriptionComponent } from './pages/news-article-description/news-article-description.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
