import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // public categoryList:any;
  imageUrl = environment.imageUrl
  imageUrlPath = environment.imageUrlPath;
  iframeVideo = 'https://www.youtube.com/embed/wJnBTPUQS5A?rel=0';
  iframeVideoIndex:any = "";
  PopularNews:any = [];
  private twitter: any;

  constructor(public homeService:HomeService,private _Router:Router) {
    this.initTwitterWidget();
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.GetAllPopularPosts();
    // this.Allcategory();
  }

  initTwitterWidget() {
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

  // Allcategory() {
  //   debugger;
  //   this.homeService.Allcategory().subscribe(
  //     (result: any) => {
  //       if (result) {
  //         this.categoryList = result;
  //         for(let c of this.categoryList){
  //           if(c.SubCategoryJson){
  //             c.SubCategoryJson = JSON.parse(c.SubCategoryJson);
  //         }
  //         }
  //         this.homeService.categoryList = this.categoryList
  //       }
  //     });
  // }

  goProducts(newsId) {
    debugger
    this._Router.navigate(['/news-description'], { queryParams: { newsId: newsId } });
  }

  ifraVideo(index,link){
    debugger
    this.iframeVideoIndex = index
       this.iframeVideo = link;
      document.getElementById("iframeVideo").innerHTML = '<iframe src="'+link.toString().trim()+'" width="420" height="345"></iframe>'
  }


  gotoArticle(obj){
    this.homeService.selectedArticleNews = obj;
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


// @Pipe({ name: 'safe' })
// export class SafePipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}
//   transform(url) {
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }
// } 
