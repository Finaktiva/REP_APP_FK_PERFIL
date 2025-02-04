import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BacktokenService {

  private http = inject(HttpClient)
  private apiKey = "CrUMvDIKSRD1wTJkjzRIWGTLx2V2oc5Bskc2Zz25VRoJsf7CWBd2rU1RHY15NzOhmtP6U8UMAQnwjykrCtaO4grzLRVizSBx7PAp2Qkiv3SGd6eYViBnhhRX";

  getBackToken() {
    return this.http.post(`${environment.URI_SOCIAL3}auth/back`, { key: this.apiKey, excludeInterceptor: true });
  }

}
