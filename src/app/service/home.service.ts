import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from '../environment/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public categoryList:any;
  public advertisementList:any;
  public sliderNewsList:any;
  public latestNewsList:any;
  public videoNews:any;
  public articles:any;
  public scrollNews:any;
  public selectedArticleNews:any;
  constructor(private _httpClient: HttpClient) { }


//   getSubject(obj){
//     return this.http.post(configuration.url +'Subject/GetAllStudentSubject', obj).map((res: Response) => {
//         return res;
//     })
// }


  Allcategory(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/Allcategory")
      .pipe(catchError(this.handleError));
  }

  GetSliderNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetSliderNews")
      .pipe(catchError(this.handleError));
  }

  GetLatestNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetLatestNews")
      .pipe(catchError(this.handleError));
  }

  GetOtherNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetOtherNews")
      .pipe(catchError(this.handleError));
  }

  GetNews(id): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetNewsById/"+id)
      .pipe(catchError(this.handleError));
  }

  GetVideoNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetVideoNews")
      .pipe(catchError(this.handleError));
  }

  GetAdvertisement(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetAdvertisement")
      .pipe(catchError(this.handleError));
  }

  GetArticles(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetArticles")
      .pipe(catchError(this.handleError));
  }

  GetNewsByCategory(id): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetNewsByCategoryId/"+id)
      .pipe(catchError(this.handleError));
  }

  GetScrollNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetScrollNews")
      .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
