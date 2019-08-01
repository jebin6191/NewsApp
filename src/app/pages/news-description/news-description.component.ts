import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(private _Router:Router,private route: ActivatedRoute, private homeService:HomeService,
    private formBuilder: FormBuilder) { }


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
    console.log("this.CommentsForm"+this.CommentsForm);
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
    
    // this.CommentsList  = [{
    //   "Description": "Test Comment By Jebin ",
    //   "CommentDate": "20-09-2018",
    //   "CommentedBy": "jebin"
    //   },
    //    {
    //   "Description": "Test Comment By joel ",
    //   "CommentDate": "20-09-2018",
    //   "CommentedBy": "joel"
    //   },
    //    {
    //   "Description": "Test Comment By Jemisha ",
    //   "CommentDate": "20-09-2018",
    //   "CommentedBy": "Jemisha"
    //   }]
      
    this.homeService.NewsCommentsSave(this.newsId).subscribe(
      (result: any) => {
        if (result) {
          // console.log(result);
           this.CommentsList = result;
        }
      })
  }

  GetNews(id){
    this.homeService.GetNews(id).subscribe(
      (result: any) => {
        if (result) {
          this.newsDetails = result;

           console.log(this.newsDetails[0].HashTag);
           this.HashTagList = (this.newsDetails[0].HashTag).split(';');

           console.log(JSON.stringify (this.HashTagList));
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
