import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {
  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

  gotoArticle(data){
    console.log(data);
    // this.window.open("http://localhost:4200/"+"article-description?newsId="+data.newsId+
    // "&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump, '_self');
    this.window.open(environment.endPoint+ "article-description?newsId="+data.newsId+
    "&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump, '_self');
  }

}
