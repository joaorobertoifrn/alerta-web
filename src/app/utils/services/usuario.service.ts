import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Usuario } from 'src/app/models/usuario.model';
import { API_CONFIG } from 'src/app/config/api.config';
import { UsuarioDTO } from '../../models/dto/usuarioDTO.model';

@Injectable()
export class UsuarioService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/usuario`);
  }

  findById(id: string) {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuario/${id}`);
  }

  findByEmail(email: string): Observable<UsuarioDTO> {
    const params = new HttpParams().append('value', email);
    return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuario/email/?${params}`);
  }

  insert(obj: Usuario) {
    return this.http.post(`${API_CONFIG.baseUrl}/usuario`, obj, {
      observe: 'response',
      responseType: 'json'
    });
  }

  update(obj: Usuario) {
    return this.http.put(`${API_CONFIG.baseUrl}/usuario`, obj, {
      observe: 'response',
      responseType: 'json'
    });
  }

  delete(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/usuario/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

}
