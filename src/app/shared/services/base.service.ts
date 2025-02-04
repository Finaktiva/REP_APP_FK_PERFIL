import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "./storage.service";
import { Session, UserSession } from "../interfaces/session.interface";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  
  private router = inject(Router)

  getSession(): UserSession | any {
    return Storage.getAll("Session");
  }

  setSession(session: Session) {
    Storage.setAll("session", session);
  }

  getToken() {
    if (this.signinCheck()) {
      let session: any = Storage.getAll("session");
      return session.token;
    }
    return "";
  }

  signinCheck() {
    return Storage.check("session");
  }

  redirecTo(route: string): void {
    if (route && route !== "") {
      this.router.navigate([route]);
    }
  }
}
