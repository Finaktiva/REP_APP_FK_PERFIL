import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient)

  loggin(data: { email: string, password: string }) {
    return this.http.post(`${environment.AWS_API_URL}/auth/login`, data);
  }

  changePasswordByOldPassword(data: any) {
    return this.http.post(`${environment.AWS_API_URL}/auth/changePasswordByOldPassword`, data);
  }

  sendCodeForChangePassword(data: object) {
    return this.http.post(`${environment.AWS_API_URL}/auth/sendCodeForChangePassword`, data)
  }

  sendOtpForPassword(data: object) {
    return this.http.post(`${environment.AWS_API_URL}/auth/sendOtpForPassword`, data);
  }

  changePasswordByCode(data: object) {
    return this.http.post(`${environment.AWS_API_URL}/auth/changePasswordByCode`, data)
  }

  loginMigrate(data: { user: any, password?: string }) {
    return this.http.post(`${environment.AWS_API_URL}/auth/loginMigrate`, data);
  }

  createUserSCF(data: { email: any, password: string }) {
    return this.http.post(`${environment.AWS_API_URL}/auth/createUserSCF`, data);
  }

}
