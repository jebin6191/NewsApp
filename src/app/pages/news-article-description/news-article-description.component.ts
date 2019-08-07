import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HomeService } from 'src/app/service/home.service';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-news-article-description',
  templateUrl: './news-article-description.component.html',
  styleUrls: ['./news-article-description.component.css']
})
export class NewsArticleDescriptionComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    this.window.scrollTo(0,0);
  }

}
