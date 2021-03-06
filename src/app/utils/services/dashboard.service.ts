import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardAlertas } from '../../models/dashboard.alertas.model';

@Injectable()
export class DashboardService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${API_CONFIG.baseUrl}/dashboard`);
  }

  alertasRebidos(): Observable<DashboardAlertas> {
    return this.http.get<DashboardAlertas>(`${API_CONFIG.baseUrl}/dashboard/alertasRecebidos`);
  }

}
