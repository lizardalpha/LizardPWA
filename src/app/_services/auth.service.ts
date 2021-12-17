import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const AUTH_API = 'http://192.168.0.56:7798/account/';

const AUTH_API = 'https://pcaimages.primeinstore.co.za/account/';

//const AUTH_API = 'https://localhost:44334/account/';

//const AUTH_API = 'http://192.168.0.56:1554/account/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class AuthService {

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
    constructor(private http: HttpClient) { }
    
    login(credentials): Observable<any> {
      console.log(credentials);
      console.log(AUTH_API);
        return this.http.post(AUTH_API + 'login', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
        
    }
   
    register(user): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        }, httpOptions);
    }
    forgotPassword(user): Observable<any> {
      
        return this.http.post(AUTH_API + 'ForgotPassword', JSON.stringify(user), httpOptions);
    }
    resetPassword(user): Observable<any> {
      
        return this.http.post(AUTH_API + 'ResetPassword', JSON.stringify(user), httpOptions);
    }

    getAllUsers(): Observable<any> {
        return this.http.get(AUTH_API + 'GetAllUsers', httpOptions);
    }

    getExistingUser(username): Observable<any> {
      
        return this.http.get(AUTH_API + 'GetExistingUsers?username=' + username, httpOptions);
    }

    //we also need to get all roles
    getAllRoles(): Observable<any> {
        return this.http.get(AUTH_API + 'GetAllRoles', httpOptions);
    }
}
