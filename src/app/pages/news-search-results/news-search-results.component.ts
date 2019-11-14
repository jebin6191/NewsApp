import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-news-search-results',
  templateUrl: './news-search-results.component.html',
  styleUrls: ['./news-search-results.component.css']
})
export class NewsSearchResultsComponent implements OnInit {
  NewsListByDateRange= <any>[];
  NewsListBySearchTerm= <any>[];
  imageUrl = environment.imageUrl;
  StartDate: string;
  EndDate: string;
  SearchTerm : string;

  constructor(public homeService:HomeService,private route: ActivatedRoute, private router: Router) {
          this.route.url.subscribe(url =>{
            console.log(url);
      });
   }

  ngOnInit() {
 
    this.route
    .queryParams
    .subscribe(params => {
        this.StartDate = params['StartDate'];
        this.EndDate = params['EndDate'];
        this.SearchTerm =  params['SearchTerm'];
    });

    if(this.StartDate != ""){
      this.SearchByDate(this.StartDate, this.EndDate);
    }
    if(this.SearchTerm != ""){
      this.SearchByTerm(this.SearchTerm);
    }  
  }
  ngOnChanges(){
    if(this.StartDate != ""){
      this.SearchByDate(this.StartDate, this.EndDate);
    }
    if(this.SearchTerm != ""){
      this.SearchByTerm(this.SearchTerm);
    } 
  }

  SearchByTerm(searchstring){
    this.homeService.search(searchstring).subscribe(
      (result: any) => {
        if (result) {
          console.log("result"+JSON.stringify(result))
          this.NewsListBySearchTerm = result; 
        }
      });
  }

  SearchByDate(Sdate: string, Edate: string){
    let data = {
      StartDate : Sdate,
      EndDate : Edate
    }
    this.homeService.GetNewsByDateRange(data).subscribe(
      (result: any) => {
        if (result) {
          this.NewsListByDateRange = result; 
          this.NewsListByDateRange.forEach(element => {
            element.SubCategoryJson = JSON.parse(element.SubCategoryJson)

          });     
          console.log(JSON.stringify(this.NewsListByDateRange));
        }
      });
  }

}
