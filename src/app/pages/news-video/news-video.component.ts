import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HomeService } from 'src/app/service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-video',
  templateUrl: './news-video.component.html',
  styleUrls: ['./news-video.component.css']
})
export class NewsVideoComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  iframeVideo = '';
  iframeVideoIndex:any = "";
  constructor(public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }


  ifraVideo(index,link){
    debugger
    this.iframeVideoIndex = index
       this.iframeVideo = link;
      document.getElementById("iframeVideo").innerHTML = '<iframe src="'+link.toString().trim()+'" width="420" height="345"></iframe>'
  }

  videopopup(){
    document.getElementById("iframeVideo").innerHTML = "";
  }
}
