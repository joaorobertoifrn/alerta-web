import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';
import { Credenciais } from 'src/app/models/credenciais.model';
import { LocalUser } from 'src/app/models/local_user';
import { StorageService } from './storage.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(public http: HttpClient, public storage: StorageService, private router: Router, public usuarioService: UsuarioService) { }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  authenticate(creds: Credenciais) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
}

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  register() {
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['/login']);
  }

}
