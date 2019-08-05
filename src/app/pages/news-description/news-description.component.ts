import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-news-description',
  templateUrl: './news-description.component.html',
  styleUrls: ['./news-description.component.css']
})
export class NewsDescriptionComponent implements OnInit {

  newsId:any;
  newsDetails:any;
  ShareUrl:string;
  CommentsForm: FormGroup;
  CommentsList: any;
  selected: any = '';
  HashTagList: any=[];
  DetailedNews: any;
  constructor(private _Router:Router,private route: ActivatedRoute, private homeService:HomeService,
    private formBuilder: FormBuilder, private deviceService: DeviceDetectorService, private meta: Meta) { }


  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsId = params.newsId;
      this.GetNews(this.newsId)
      this.ShareUrl = "http://www.onebharathnews.in/news-description?newsId="+this.newsId
    })

    this.CommentsForm = this.formBuilder.group({
      NewsId:[this.newsId],
      ParentId:[0],
      Description:[''],
      CommentType:['comment'],
      CommentBy:[''],
    });
    this.GetComments();

  
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
      // this.router.navigate(['/search-results',{queryParams:{StartDate: StartDate, EndDate: EndDate  }}])  
    }
  }

  SaveComments(){
    debugger;
    const data = this.CommentsForm.value;
    if(data){
      this.homeService.NewsCommentsSave(data).subscribe(
        (result: any) => {
          if (result) {
            let Response = result;
          }
        })
    }

  }

  GetComments(){  
      
    this.homeService.NewsCommentsGet(this.newsId).subscribe(
      (result: any) => {
        if (result) {
           this.CommentsList = result;
           console.log(this.CommentsList);
        }
      })
  }

  GetNews(id){
    this.homeService.GetNews(id).subscribe(
      (result: any) => {
        if (result) {
          this.newsDetails = result;
          this.DetailedNews = this.newsDetails[0].News;
           console.log(this.newsDetails[0]);
           this.meta.addTag({httpEquiv: 'Content-Type', content: 'text/html'});
           this.meta.addTag({property: 'og:title', content: this.newsDetails[0].HeadLine});
           this.meta.addTag({property: 'og:description', content: this.newsDetails[0].News });
           this.meta.addTag({property: 'og:image', content: 'http://admin.onebharathnews.in/CategoryFiles/'+this.newsDetails[0].ImageThumb});
        }
      })
  }

}

export class Comments {
  NewsId: number;
  ParentId:number;
  Description: string;
  CommentType:string;
  CommentedBy:string;
}
