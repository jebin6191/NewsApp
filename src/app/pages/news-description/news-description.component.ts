import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-description',
  templateUrl: './news-description.component.html',
  styleUrls: ['./news-description.component.css']
})
export class NewsDescriptionComponent implements OnInit {

  newsId:any;
  newsDetails:any;
  ShareUrl:string;
  constructor(private _Router:Router,private route: ActivatedRoute, private homeService:HomeService) { }


  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      console.log(params,'sss');

      this.newsId = params.newsId;
      this.GetNews(this.newsId)
      this.ShareUrl = "http://www.onebharathnews.in/news-description?newsId="+this.newsId
    })

  }


  GetNews(id){
    this.homeService.GetNews(id).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
          this.newsDetails = result;
          console.log(JSON.stringify(this.newsDetails)+ 'test')
        }
      })
  }

}
