import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Dashboard } from 'src/app/models/dashboard.model';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { AlertaService } from 'src/app/utils/services/alerta.service';
import { DashboardService } from 'src/app/utils/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dashboard?: Dashboard;
  listaAlerta?: AlertaDTO[] = []
  dataSource = new MatTableDataSource(this.listaAlerta);

  displayedColumns: string[] = ['id', 'instante','criticidade', 'texto', 'equipamento', 'localEquipamento'];

  public alertaDTO: AlertaDTO;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dashboardService: DashboardService,
    public alertaService: AlertaService,
    private toastr: ToastrService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadData();
    setInterval (()=> {
        this.loadData();
    },30000)
  }

  loadData() {
    this.dashboardService.findAll()
    .subscribe(response => {
      this.dashboard = response as Dashboard;
    },
    error => {});
    this.alertaService.findAll().subscribe(
      response => {
        this.listaAlerta = response;
        this.dataSource = new MatTableDataSource(this.listaAlerta);
        },
      error => {
        this.toastr.error('Alerta', 'Falha ao carregar a lista  dos Alertas. Erro: ' + error);
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
