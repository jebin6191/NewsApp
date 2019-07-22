import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-news-search-results',
  templateUrl: './news-search-results.component.html',
  styleUrls: ['./news-search-results.component.css']
})
export class NewsSearchResultsComponent implements OnInit {
  NewsListByDateRange= <any>[];
  imageUrl = environment.imageUrl

  constructor(public homeService:HomeService,private route: ActivatedRoute) {
   }

  ngOnInit() {
    let StartDate: string;
    let EndDate: string;
    this.route
    .queryParams
    .subscribe(params => {
        StartDate = params['StartDate'];
        EndDate = params['EndDate'];
    });
 
    let data = {
      StartDate : StartDate,
      EndDate : EndDate
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
