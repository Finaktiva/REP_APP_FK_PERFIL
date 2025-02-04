import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommonsService {

    private http = inject(HttpClient)

    getPhonePrefixes() {
        return this.http.get(`${environment.AWS_API_URL}/commons/phonePrefixes`)
    }

    getRoles() {
        return this.http.get(environment.AWS_API_URL + '/commons/roles');
      }

}