import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    isLoggedIn = false;
    roles: string[] = [];
    canAccessRoute = true;
    constructor(private _authService: AuthService, private _router: Router, private tokenStorageService: TokenStorageService) {
    }
    containsAny(source, target) {
        var result = source.filter(function (item) { return target.indexOf(item) > -1 });
        return (result.length > 0);
    } 
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
         this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {

            const user = this.tokenStorageService.getUser();
            this.roles = user.userRoles;
            if (next.data.roles) {
                this.canAccessRoute = this.containsAny(next.data.roles, this.roles)
            }
            if (next.data.roles && !this.canAccessRoute) {
                // role not authorised so redirect to home page
                this._router.navigate(['/']);
                return false;
            }
            return true;
        }

        // navigate to login page
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }
 
}
