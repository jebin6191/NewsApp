import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {
  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  constructor(public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}
