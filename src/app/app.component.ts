import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Upload Files';
  isShow=true;
  welcomeShow = false;

  showUpload(){
    this.isShow=false;
    this.welcomeShow=true;
  }
}
