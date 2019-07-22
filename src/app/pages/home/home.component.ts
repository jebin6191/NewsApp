import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { environment } from 'src/app/environment/environment';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
    // this.Allcategory();
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

videopopup(){
  document.getElementById("iframeVideo").innerHTML = "";
}


}


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 
