import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'; // IMPORTANTE: IMPORT ATUALIZADO
import { API_CONFIG } from '../config/api.config';
import { Router } from '@angular/router';
import { StorageService } from '../utils/services/storage.service';
import { LoginService } from '../utils/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService, private router: Router, public auth: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localUser = this.storage.getLocalUser();
    const N = API_CONFIG.baseUrl.length;
    const requestToAPI = req.url.substring(0, N) === API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
