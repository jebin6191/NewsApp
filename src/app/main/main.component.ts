import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../service/home.service';
import { environment } from '../environment/environment';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';

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
  uploadResponse = { status: '', message: '', filePath: '' };



  constructor(public homeService:HomeService,private _Router:Router, private router: Router, 
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
// document.getElementById("mat-input-1").textContent="";
// debugger
//     let result1 = [{
//       "Id": 10014,
//       "Title": "UK Ambassador Reportedly Calls Trump ‘Inept,’ ‘Insecure’ In Leaked",
//       "Link": "https://www.youtube.com/embed/BfLZJyek5qU"
//     }]
//     result1.forEach((item,i) => {
//          var src = item.Link;
//          var src1 = src.split("embed/");
//           result1[i]['videoId']=  src1[1]
//     })

//     console.log("getVideoNews forloop  ==>>  " + JSON.stringify(result1))
  this.searchTerm.valueChanges.subscribe(
    term => {
      if (term != '') {
        this.homeService.search(term).subscribe(
          data => {
            this.NewsList = data as any[];
            // console.log("this.NewsList"+JSON.stringify(this.NewsList))
            //console.log(data[0].BookName);
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
    window.open("http://www.onebharathnews.in/home", "_self")
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    // console.log(event);
    let dateStr = event.value.toLocaleString();
    const d = new Date(dateStr);
    const date1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());


    // let res = new Date(dateStr.getDate, dateStr.getDay, dateStr.getFullYear)
  }
  MenuToggleFn(){

    this.MenuToggle = !this.MenuToggle;
  }


  Allcategory() {
    debugger;
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

          // console.log(JSON.stringify(this.categoryList));
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
debugger
          for(let i in result){
            // let test = result[i].Link;
            // let res = test.split("/");
            // let res1 = res.indexOf('embed');
            // res1 = res[res1+1]
            // result[i].VideoId = res1;
            this.homeService.advertisementList = result;
          }
          

        // var video_id = window.location.search.split('v=')[1];
        // var ampersandPosition = video_id.indexOf('&');
        // if(ampersandPosition != -1) {
        //   video_id = video_id.substring(0, ampersandPosition);

         
        // }

          
        }
      });
  }

  getSliderNews() {
    debugger;
    this.homeService.GetSliderNews().subscribe(
      (result: any) => {
        if (result) {
          this.homeService.sliderNewsList = result;        
        }
      });
  }


  getLatestNews() {
    debugger;
    this.homeService.GetLatestNews().subscribe(
      (result: any) => {
        if (result) {
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
          this.homeService.scrollNews = result;          
        }
      });
  }
  NavigateDesc(id){
    window.open("http://onebharathnews.in/news-description?newsId="+id, "_blank");
    // window.location.href = 'http://onebharathnews.in/news-description?newsId='+id
  }

  gotoSubcategory(obj){
    this._Router.navigate(['/news-subcategory'], { queryParams: { subcategoryId: obj.SubCategoryId } });
  }

  NavigateToSearch(){
    document.getElementById("navbarSupportedContent1").className = 'collapse navbar-collapse';
    if(this.searchString == null || this.searchString == ""){
      alert("SearchText can't be empty");
      return false;
     
    }
    this._Router.navigate(['/search-results'], { queryParams: { SearchTerm: this.searchString , StartDate: "", EndDate:""} } )
  }

  gotobottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  gotoTop(){
    window.scrollTo(0,0)
  }
  ClosePopup(){
    window.location.reload();
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
    console.log(formData);
    this.homeService.FileUploads(formData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
  }

}
