import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileExists = false;
  submitMessage = '';
  sentForProcessing = true;
  showSuccessContainer = false;
  title = 'Upload Files';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
          this.fileExists=true;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
  delete(url){

    this.uploadService.deleteFiles(url).subscribe(
      event => {
        this.fileInfos = this.uploadService.getFiles();
      }
    )
  }
  submit(){
    this.uploadService.submit().subscribe(
      event => {
        this.submitMessage = 'Documents have been successfully sent for Processing. Thanks!!'
        this.sentForProcessing = false;
        this.showSuccessContainer=true;
      },
      err =>{
        this.submitMessage = 'Some problem while sending files for processing. Please try again!!';
        this.sentForProcessing=true;
        this.fileInfos = this.uploadService.getFiles();
      }
    )

  }
}
