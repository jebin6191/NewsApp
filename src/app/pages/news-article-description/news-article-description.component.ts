import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-news-article-description',
  templateUrl: './news-article-description.component.html',
  styleUrls: ['./news-article-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsArticleDescriptionComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  private twitter: any;
  newsId:number = 0;
  NewsArticle:any;
  categoryListArr:any =[];

  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router, private route: ActivatedRoute) { 
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsId = params.newsId;
    })  
    this.initTwitterWidget(window);
  }

  ngOnInit() {
    this.GetNewsArticleById(this.newsId);
    this.Allcategory();

  }

  Allcategory() {
    this.homeService.Allcategory().subscribe((result: any) => {
          this.categoryListArr = result;
      });
  }

  initTwitterWidget(window) {
    this.twitter = this._Router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function (d, s, id) {
          let js: any, fjs = d.getElementsByTagName(s)[0],
              t = (<any>window).twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function (f: any) {
              t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));

        if ((<any>window).twttr.ready())
          (<any>window).twttr.widgets.load();

      }
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



@Pipe({
  name: 'SafePipe1'
})
export class SafePipe1 implements PipeTransform {

  constructor(private sanitize: DomSanitizer){  }

  transform(html: string): any {
    return this.sanitize.bypassSecurityTrustHtml(html); 
  }

}