import { Component, OnInit, Pipe, PipeTransform, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { environment } from 'src/app/environment/environment';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrl = environment.imageUrl
  imageUrlPath = environment.imageUrlPath;
  iframeVideo = 'https://www.youtube.com/embed/wJnBTPUQS5A?rel=0';
  iframeVideoIndex:any = "";
  PopularNews:any = [];
  private twitter: any;
  NationalNewsList:any = [];

  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) {
    this.initTwitterWidget(window);
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.NationalNews();  
    this.GetAllPopularPosts();
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

  NationalNews() {
    this.homeService.GetNationalNews().subscribe((result: any) => {
        if (result) {
          this.NationalNewsList = result;
        }
      });
    }

  goProducts(data) {
    this._Router.navigate(['/news-description'], { queryParams: { newsId: data.newsId } });
  }

  ifraVideo(index,link){
    this.iframeVideoIndex = index
       this.iframeVideo = link;
      document.getElementById("iframeVideo").innerHTML = '<iframe src="'+link.toString().trim()+'" width="420" height="345"></iframe>'
  }

  GotToDesc(data){  
    this.window.open(environment.endPoint+ "news-description?newsId="+data.newsId+
    "&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump);
  }

  gotoArticle(data){
    console.log(data);
    // this.window.open("http://localhost:4200/"+"article-description?newsId="+data.newsId+
    // "&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump, '_self');
    this.window.open(environment.endPoint+ "article-description?newsId="+data.newsId+
    "&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump);
  }

  GetAllPopularPosts(){      
    this.homeService.GetPopularNews().subscribe(
      (result: any) => {
        if (result) {
           this.PopularNews = result;
           console.log(this.PopularNews);
        }
      })
  }

  videopopup(){
    document.getElementById("iframeVideo").innerHTML = "";
  }
}

