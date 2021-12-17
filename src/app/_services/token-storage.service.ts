import { Injectable, EventEmitter, Output } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

  roles: string[] = [];

  isAdministrator = false;
  isNovaOps = false;
  isSales = false;
  isOps = false;
  isMyMobility = false;
  isFinance = false;
  username = '';
  user: any;


    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private authService: AuthService) {
    const user = this.getUser();
    return;
    

  }

    signOut() {
      localStorage.removeItem('TOKEN_KEY');
      localStorage.removeItem('USER_KEY');
    }

    public saveToken(token: string) {
       
        //window.sessionStorage.removeItem(TOKEN_KEY);
      // window.sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem('TOKEN_KEY');
      localStorage.setItem('TOKEN_KEY', token);
    }

  public getToken(): string {
    return localStorage.getItem('TOKEN_KEY');
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user) {
      //  window.sessionStorage.removeItem(USER_KEY);
      //window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.removeItem('USER_KEY');
      localStorage.setItem('USER_KEY', JSON.stringify(user));
       
    }

  public getUser() {
   

      return JSON.parse(localStorage.getItem('USER_KEY'));
    }

    checkDetails(): Observable<any> {
        if (this.getUser()) {
            this.getLoggedInName.emit(this.getUser());
          return JSON.parse(localStorage.getItem('USER_KEY'));
        } else {
            this.getLoggedInName.emit(this.getUser());
          return JSON.parse(localStorage.getItem('USER_KEY'));
        }
    }
}
