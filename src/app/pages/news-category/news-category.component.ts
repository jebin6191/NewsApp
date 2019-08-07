import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { environment } from 'src/app/environment/environment';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {
  newsCategoryId:any;
  newsCategoryList:any;
  imageUrl = environment.imageUrl
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }

  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      this.window.scrollTo(0,0);
      this.newsCategoryId = params.categoryId;
      this.getNewsByCategory(this.newsCategoryId);
    })
  }

  getNewsByCategory(id) {
    this.homeService.GetNewsByCategory(id).subscribe(
      (result: any) => {
        if (result) {
          this.newsCategoryList = result;
          for(let c of this.newsCategoryList){
            if(c.News){
              c.News = JSON.parse(c.News);
          }
          }
         console.log("getNewsByCategory 22 ==>>  " + JSON.stringify(this.newsCategoryList))  
        }
      });
  }

}
