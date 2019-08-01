import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      uploadedfile: ['', Validators.required],
      description: ['']
    });
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

// export function requiredFileType( type: string) {
//   return function (control: FormControl) {
//     const file = control.value;
//     if ( file ) {
//       const extension = file.name.split('.')[1].toLowerCase();
//       if ( type.toLowerCase() !== extension.toLowerCase() ) {
//         return {
//           requiredFileType: true
//         };
//       }
      
//       return null;
//     }

//     return null;
//   };
// }
