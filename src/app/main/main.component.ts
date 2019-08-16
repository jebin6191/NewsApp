import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../service/home.service';
import { environment } from '../environment/environment';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  MenuToggle: boolean = false;
  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse: any = "";

  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router, private router: Router, 
    private formBuilder: FormBuilder) { }
  public categoryList:any;
  public advertisementList:any;
  searchTerm : FormControl = new FormControl();
  NewsList = <any>[]
  events: string[] = [];
  selected: any = '';
  searchString ="";
 
  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      uploadedfile: ['', Validators.required],
      description: ['']
    });

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.homeService.search(term).subscribe(
            data => {
              this.NewsList = data as any[];

          })
        }
      })

    this.Allcategory();
    this.getAdvertisement();
    this.getSliderNews();
    this.getLatestNews();
    this.getArticles();
    this.getVideoNews();
    this.getScrollNews();
  }

  ReloadApp(){
    this.window.open("http://www.onebharathnews.in/home", "_self")
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let dateStr = event.value.toLocaleString();
    const d = new Date(dateStr);
    const date1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  }

  MenuToggleFn(){
    this.MenuToggle = !this.MenuToggle;
  }


  Allcategory() {
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
          for(let i in result){
            this.homeService.advertisementList = result;
          }         
        }
      });
  }

  GotToDesc(data){  
    console.log("test"+JSON.stringify(data));
    this.window.open(environment.endPoint+ "news-description?newsId="+data.newsId+
    "&title="+ encodeURIComponent(data.NewsHeadLine)+"&image="+encodeURIComponent(environment.imageUrl+data.Newsthump), '_self');
  }

  getSliderNews() {
    debugger;
    this.homeService.GetSliderNews().subscribe(
      (result: any) => {
        if (result) {
          for(let res of result){
            res.NewsHeadLine = res.HeadLine;
          }
          this.homeService.sliderNewsList = result;  
          
        }
      });
  }


  getLatestNews() {
    debugger;
    this.homeService.GetLatestNews().subscribe(
      (result: any) => {
        if (result) {
          for(let res of result){
            res.NewsHeadLine = res.HeadLine;
          }
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
          for(let res of result){
            res.NewsHeadLine = res.HeadLine;
          }
          this.homeService.scrollNews = result;          
        }
      });
  }
  NavigateDesc(id){
    this.window.open("http://onebharathnews.in/news-description?newsId="+id, "_blank");
    // window.location.href = 'http://onebharathnews.in/news-description?newsId='+id
  }

  gotoSubcategory(obj){
    this._Router.navigate(['/news-subcategory'], { queryParams: { subcategoryId: obj.SubCategoryId } });
    this.  gotoTop();
  }

  NavigateToSearch(event){
    console.log("Event Triggered")
    if(event){
      document.getElementById("navbarSupportedContent1").className = 'collapse navbar-collapse';
      if(this.searchString == null || this.searchString == ""){
        alert("SearchText can't be empty");
        return false;
    }
    }
    this._Router.navigate(['/search-results'], { queryParams: { SearchTerm: this.searchString , StartDate: "", EndDate:""} } )
  }

  gotobottom(){
    this.window.scrollTo(0,document.body.scrollHeight);
  }

  gotoTop(){
    this.window.scrollTo(0,0)
  }
  ClosePopup(){
    this.window.location.reload();
    document.getElementById("navbarSupportedContent1").className = 'collapse navbar-collapse';

  }



  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('uploadedfile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('uploadedfile').value);
    const body = {
      "Body": this.form.get('description').value,
      "Name": this.form.get('Name').value,
    };
    formData.append('data', JSON.stringify(body));
    this.homeService.FileUploads(formData).subscribe(
      (res) => {this.uploadResponse = res
      console.log(this.uploadResponse);
        if(this.uploadResponse == "Mail Sent"){
          alert("Submitted Successfully");
          this.form.reset();
        }     
      }
    );
  }

}
