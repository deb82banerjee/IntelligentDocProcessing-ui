import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://intelligentdocprocessing-env-1.eba-pnpdmrvq.us-east-2.elasticbeanstalk.com/idp';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    let qryStr = new HttpParams();
    qryStr = qryStr.append('userId','testUser');

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      params : qryStr
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    let qryStr = new HttpParams();
    qryStr = qryStr.append('userId','testUser');
    return this.http.get(`${this.baseUrl}/files`, {params:qryStr});
  }
  deleteFiles(url): Observable<any> {
    return this.http.get(url);
  }
  submit(): Observable<any> {
    let qryStr = new HttpParams();
    qryStr = qryStr.append('userId','testUser');
    return this.http.get(`${this.baseUrl}/processFiles`, {params:qryStr});
  }
}
