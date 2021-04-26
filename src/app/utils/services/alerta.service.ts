import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { Alerta } from 'src/app/models/alerta.models';

@Injectable()
export class AlertaService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findAll(): Observable<AlertaDTO[]> {
    return this.http.get<AlertaDTO[]>(`${API_CONFIG.baseUrl}/alertas`);
  }

  findAlertaEmitido(): Observable<AlertaDTO[]> {
    return this.http.get<AlertaDTO[]>(`${API_CONFIG.baseUrl}/alertas/alertaEmitido`);
  }

  findById(id: string) {
    return this.http.get<AlertaDTO>(`${API_CONFIG.baseUrl}/alertas/${id}`);
  }

  enviarAlerta(id: string) {
    return this.http.get<Alerta>(`${API_CONFIG.baseUrl}/alertas/enviarAlerta/${id}`);
  }

  insert(obj: Alerta): Observable<Alerta> {
    return this.http.post<Alerta>(`${API_CONFIG.baseUrl}/alertas`, obj);
  }

  delete(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/alertas/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

}
