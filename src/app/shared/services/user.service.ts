import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private http = inject(HttpClient)

  createUser(data:object): Observable<IUser>{
    return this.http.post<IUser>(`${environment.AWS_API_URL}/users`, data);
  }

  updateUser(data:object): Observable<IUser>{
    return this.http.put<IUser>(`${environment.AWS_API_URL}/users`, data);
  }

  // getUserByEmail(email:string): Observable<any>{
  //   return this.http.get(`${environment.AWS_API_URL}/users/userByEmail?email=${email}`)
  // }

  getUserById(id:string): Observable<any>{
    return this.http.get(`${environment.AWS_API_URL}/users/userByid?id=${id}`)
  }

  verifyAccount(data:object): Observable<any>{
    return this.http.post(`${environment.AWS_API_URL}/auth/verifyAccount`, data)
  }

  createUserLog(data:any){
    return this.http.post(`${environment.AWS_API_URL}/users/createUserLog`, data);
  }

  resendCodeForVerifyAccount(data:object): Observable<any>{
    return this.http.post(`${environment.AWS_API_URL}/auth/resendCodeForVerifyAccount`, data)
  }

  searchEmail(email:string): Observable<any> {
    return this.http.get(`${environment.URI_SOCIAL3}users/filter/${email}`);
  }

  loggin(data: object): Observable<any> {
    return this.http.post(`${environment.AWS_API_URL}/auth/login`, data);
  }
}
