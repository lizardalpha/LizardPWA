import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize } from 'rxjs/operators'
import { TokenStorageService } from '../_services/token-storage.service';
import { LoaderService } from '../directives/loader.service';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loaderService.isLoading.next(true);
    let authReq = req;
    const token = this.token.getToken();


    if (token != null) {

      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(finalize(() => this.loaderService.isLoading.next(false)));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
