import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  constructor(private http: HttpClient) { }
  host = 'http://localhost:8083/';
  generate(data) {
    return this.http.post(this.host + 'generate', data);
  }
  getData(id) {
    return this.http.get(this.host + 'loader?id=' + id);
  }
  copyToClipBoard(id) {    
    return this.host + 'loader?id=' + id;
  }
}
