import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Dashboard } from 'src/app/models/dashboard.model';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { AlertaService } from 'src/app/utils/services/alerta.service';
import { DashboardService } from 'src/app/utils/services/dashboard.service';
import { DashboardAlertas } from '../../models/dashboard.alertas.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alertaDTO?: AlertaDTO;
  dashboard?: Dashboard;
  dashboardAlertas?: DashboardAlertas;
  listaAlerta?: AlertaDTO[] = []
  dataSource: MatTableDataSource<AlertaDTO>;

  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5];


  displayedColumns: string[] = ['id', 'instante','criticidade', 'texto', 'equipamento', 'localizacao'];

  constructor(
    public dashboardService: DashboardService,
    public alertaService: AlertaService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
    setInterval (()=> {
        this.loadData();
    },30000)
  }

  loadData() {
    this.dashboardService.findAll()
    .subscribe(response => {
      this.dashboard = response;
    },
    error => {});

    this.dashboardService.alertasRebidos()
    .subscribe(response => {
      this.dashboardAlertas = response;
    },
    error => {});
    this.listarAlertasDisparado(this.pagina, this.tamanho);
  }

  listarAlertasDisparado( pagina: number, tamanho: number ) {
    this.alertaService.findAllAlertaDisparado(pagina,tamanho).subscribe(
      response => {
        this.listaAlerta = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
        this.dataSource = new MatTableDataSource(this.listaAlerta);
        },
      error => {
        this.toastr.error('Alerta', 'Falha ao carregar a lista  dos Alertas. Erro: ' + error);
      });
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarAlertasDisparado(this.pagina, this.tamanho);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
