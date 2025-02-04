import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactMeansService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getDontBother(userId: any){
    return this.httpClient.get(`${environment.DONT_BOTHER}user-dont-bother?userId=${userId}`);
  }

  postDontBother(data: any){
    return this.httpClient.post(`${environment.DONT_BOTHER}user-dont-bother`, data);
  }

  putDontBother(data: any){
    return this.httpClient.put(`${environment.DONT_BOTHER}user-dont-bother`, data);
  }
}
