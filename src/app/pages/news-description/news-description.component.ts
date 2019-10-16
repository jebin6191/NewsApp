import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-news-description',
  templateUrl: './news-description.component.html',
  styleUrls: ['./news-description.component.css']
})
export class NewsDescriptionComponent implements OnInit {

  newsId:any;
  CommentType="news";
  newsDetails:any = [];
  ShareUrl:string;
  CommentsForm: FormGroup;
  CommentsList: any;
  selected: any = '';
  HashTagList: any=[];
  DetailedNews: any;
  categoryList: any = [];
  imageUrlPath = environment.imageUrlPath;
  private twitter: any;
  constructor(@Inject(WINDOW) private window: Window, private _Router:Router,private route: ActivatedRoute, public homeService:HomeService,
    private formBuilder: FormBuilder, private meta: Meta) { 
      this.route.queryParams
      .subscribe(params => {
        window.scrollTo(0,0);
        this.newsId = params.newsId;
       
        this.ShareUrl = "https://www.onebharathnews.tv/news-description?newsId="+this.newsId;
      })
      this.initTwitterWidget(window);  
    }


  ngOnInit() {   
    this.GetNews(this.newsId);
    this.CommentsForm = this.formBuilder.group({
      NewsId:[this.newsId],
      ParentId:[0],
      Description:[''],
      CommentType:['news'],
      CommentBy:[''],
    });
    this.GetComments();
    this.Allcategory();
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

  change(event:any){
    if(event.start != null){
      let start = new Date(event.start.toLocaleString());
      let end = new Date(event.end.toLocaleString());
      const StartDate = start.getFullYear()+'/'+ (start.getMonth()+1) +'/'+ start.getDate();
      const EndDate = end.getFullYear()+'/'+ (end.getMonth()+1) +'/'+ end.getDate();
      const data = {
        StartDate : StartDate,
        EndDate : EndDate
      };
      document.getElementById("navbarSupportedContent1").className = 'collapse navbar-collapse';
      this._Router.navigateByUrl('/search-results?StartDate='+StartDate+'&EndDate='+EndDate);  
     }
  }

  Allcategory() {
    this.homeService.Allcategory().subscribe((result: any) => {
          this.categoryList = result;
      });
  }

  SaveComments(){
    const data = this.CommentsForm.value;
    if(data){
      this.homeService.NewsCommentsSave(data).subscribe(
        (result: any) => {
        
          this.CommentsForm = this.formBuilder.group({
            NewsId:[this.newsId],
            ParentId:[0],
            Description:[''],
            CommentType:['news'],
            CommentBy:[''],
          });
          this.GetComments();
        })
    }
  }

  GetComments(){       
    this.homeService.NewsCommentsGet(this.newsId, this.CommentType).subscribe(
      (result: any) => {
        if (result) {
           this.CommentsList = result;
        }
      })
  }

  GetNews(id){
    this.homeService.GetNews(id).subscribe(
      (result: any) => {
        if (result) {
          console.log("restultt===>>  "+JSON.stringify(result))
          this.newsDetails = result;
          if(this.newsDetails.length > 0) {
            this.DetailedNews = this.newsDetails[0].News;
          }
        }
      })
    }
  }

export class Comments {
  constructor(@Inject(WINDOW) private window: Window) {}
  NewsId: number;
  ParentId:number;
  Description: string;
  CommentType:string;
  CommentedBy:string;
}
