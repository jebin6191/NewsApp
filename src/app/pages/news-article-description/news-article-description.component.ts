import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-news-article-description',
  templateUrl: './news-article-description.component.html',
  styleUrls: ['./news-article-description.component.css']
})
export class NewsArticleDescriptionComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router, private route: ActivatedRoute) { }
  newsId:number = 0;
  NewsArticle:any;
  categoryListArr:any =[];

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsId = params.newsId;
    })
    this.window.scrollTo(0,0);
    this.GetNewsArticleById(this.newsId);
    this.Allcategory();
  }

  Allcategory() {
    this.homeService.Allcategory().subscribe((result: any) => {
          this.categoryListArr = result;
      });
  }
  
  GetNewsArticleById(data){      
    this.homeService.GeArticleById(data).subscribe(
      (result: any) => {
        if (result) {
           this.NewsArticle = result;
           console.log(this.NewsArticle);
        }
      })
  }
}
