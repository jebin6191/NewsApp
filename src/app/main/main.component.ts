import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../service/home.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  constructor(public homeService:HomeService,private _Router:Router) { }
  public categoryList:any;
  public advertisementList:any;

  ngOnInit() {

// debugger
//     let result1 = [{
//       "Id": 10014,
//       "Title": "UK Ambassador Reportedly Calls Trump ‘Inept,’ ‘Insecure’ In Leaked",
//       "Link": "https://www.youtube.com/embed/BfLZJyek5qU"
//     }]
//     result1.forEach((item,i) => {
//          var src = item.Link;
//          var src1 = src.split("embed/");
//           result1[i]['videoId']=  src1[1]
//     })

//     console.log("getVideoNews forloop  ==>>  " + JSON.stringify(result1))

    this.Allcategory();
    this.getAdvertisement();
    this.getSliderNews();
    this.getLatestNews();
    this.getArticles();
    this.getVideoNews();
    this.getScrollNews();
  }


  Allcategory() {
    debugger;
    this.homeService.Allcategory().subscribe(
      (result: any) => {
        if (result) {
          this.categoryList = result;
          for(var c of this.categoryList){
            c.IsSubCatAvail = false;
            c.Toggle = false;
              if(c.SubCategoryJson){
                c.IsSubCatAvail = true;
                
                c.SubCategoryJson = JSON.parse(c.SubCategoryJson);
              }
          }

          console.log(JSON.stringify(this.categoryList));
          this.homeService.categoryList = this.categoryList
        }
      });
  }

  goProducts(newsId) {
    debugger
    this._Router.navigate(['/news-description'], { queryParams: { newsId: newsId } });
  }

  getAdvertisement() {
    debugger;
    this.homeService.GetAdvertisement().subscribe(
      (result: any) => {
        if (result) {
debugger
          for(let i in result){
            // let test = result[i].Link;
            // let res = test.split("/");
            // let res1 = res.indexOf('embed');
            // res1 = res[res1+1]
            // result[i].VideoId = res1;
            this.homeService.advertisementList = result;
          }
          

        // var video_id = window.location.search.split('v=')[1];
        // var ampersandPosition = video_id.indexOf('&');
        // if(ampersandPosition != -1) {
        //   video_id = video_id.substring(0, ampersandPosition);

         
        // }

          
        }
      });
  }

  getSliderNews() {
    debugger;
    this.homeService.GetSliderNews().subscribe(
      (result: any) => {
        if (result) {
          this.homeService.sliderNewsList = result;        
        }
      });
  }


  getLatestNews() {
    debugger;
    this.homeService.GetLatestNews().subscribe(
      (result: any) => {
        if (result) {
          this.homeService.latestNewsList = result;    
        }
      });
  }


  
  getVideoNews() {
    debugger;
    this.homeService.GetVideoNews().subscribe(
      (result: any) => {
        if (result) {
        
          result.forEach((item,i) => {
            var src = item.Link;
            var src1 = src.split("embed/");
            result[i]['videoId']=  src1[1]
       })

       this.homeService.videoNews = result;
        }
      });
  }

  

  getArticles() {
    debugger;
    this.homeService.GetArticles().subscribe(
      (result: any) => {
        if (result) {
          this.homeService.articles = result;        
        }
      });
  }

  getScrollNews() {
    debugger;
    this.homeService.GetScrollNews().subscribe(
      (result: any) => {
        if (result) {
          this.homeService.scrollNews = result;          
        }
      });
  }

  gotoSubcategory(obj){
    this._Router.navigate(['/news-subcategory'], { queryParams: { subcategoryId: obj.SubCategoryId } });
  }

  gotobottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  gotoTop(){
    window.scrollTo(0,0)
  }

}
