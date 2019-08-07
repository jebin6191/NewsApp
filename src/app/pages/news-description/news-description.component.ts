import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';

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
  constructor(@Inject(WINDOW) private window: Window, private _Router:Router,private route: ActivatedRoute, private homeService:HomeService,
    private formBuilder: FormBuilder, private meta: Meta) { 


//       <meta name="description" content="Page description. No longer than 155 characters." />

// <!-- Twitter Card data -->
// <meta name="twitter:card" value="summary">

// <!-- Open Graph data -->
// <meta property="og:title" content="Title Here" />
// <meta property="og:type" content="article" />
// <meta property="og:url" content="http://www.example.com/" />
// <meta property="og:image" content="http://example.com/image.jpg" />
// <meta property="og:description" content="Description Here" />
      this.meta.addTags([
        {name: 'description', content: 'Title and Meta tags examples'},      
        {name: 'keywords', content: 'OneBharathNews, DailyNews'},
        {name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD'},
        {httpEquiv: 'Content-Type', content: 'text/html'},
        {property: 'og:title', content: "My Text"},
        {property: 'og:type', content: "website"},
        {property: 'og:image', content: "image"},
        {property: 'og:url', content: "http://www.onebharathnews.in/news-description?newsId=100001"},
        {property: 'og:description', content: "description"},
        {property: 'twitter:card', content: "description"}
        
     ]);    
    }


  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      this.window.scrollTo(0,0);
      this.newsId = params.newsId;
      this.GetNews(this.newsId)
      this.ShareUrl = "http://www.onebharathnews.in/news-description?newsId="+this.newsId;
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

           this.meta.updateTag({property: 'og:title', content: this.newsDetails[0].HeadLine});
           this.meta.updateTag({property: 'og:description', content: this.newsDetails[0].HeadLine });
           this.meta.updateTag({property: 'og:url', content:  this.ShareUrl });
           this.meta.updateTag({property: 'og:image', content: 'http://admin.onebharathnews.in/CategoryFiles/'+this.newsDetails[0].ImageThumb});
           this.meta.updateTag({property: 'twitter:card', content: this.newsDetails[0].HeadLine });
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
