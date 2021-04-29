import { AlertaMensagem } from './../../models/alerta.mensagem.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { AlertaPagina } from '../../models/alerta.pagina.model';

@Injectable()
export class AlertaService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findAllAlertaRecebido(page, size): Observable<AlertaPagina> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${API_CONFIG.baseUrl}/alertas/pagina/recebido?${params.toString()}`);
  }

  findAllAlertaDisparado(page, size): Observable<AlertaPagina> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${API_CONFIG.baseUrl}/alertas/pagina/disparado?${params.toString()}`);
  }

  enviarAlerta(id: string) {
    return this.http.get<AlertaMensagem>(`${API_CONFIG.baseUrl}/alertas/enviarAlerta/${id}`);
  }

  insert(obj: AlertaMensagem): Observable<AlertaMensagem> {
    return this.http.post<AlertaMensagem>(`${API_CONFIG.baseUrl}/alertas`, obj);
  }

  delete(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/alertas/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

}
