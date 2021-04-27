import { Component, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { LoginService } from 'src/app/utils/services/login.service';
import { AlertaService } from '../../utils/services/alerta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/utils/services/storage.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';
import { AlertaMensagem } from '../../models/alerta.mensagem.models';
import { zonedTimeToUtc } from 'date-fns-tz';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit, AfterViewInit  {

  listaAlerta?: AlertaDTO[] = [];


  dataSource = new MatTableDataSource(this.listaAlerta);

  displayedColumns: string[] = ['id', 'instante','criticidade', 'texto', 'equipamento', 'localEquipamento', 'disparado'];

  public alertaDTO: AlertaDTO;
  public alertaForm: FormGroup;
  public isAuthLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  today: number;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: LoginService,
    public alertaService: AlertaService,
    private toastr: ToastrService,
    public storage: StorageService,
    public usuarioService: UsuarioService

  ) {
      this.alertaForm = this.formBuilder.group({
        id: ['', []],
        texto: ['', [Validators.required]],
        criticidade: ['', [Validators.required]]
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {


    this.renderer.addClass(document.querySelector('app-root'), 'alerta-page');

    this.auth.refreshToken().subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));

        this.alertaForm = new FormGroup({
          criticidade: new FormControl(null, Validators.required),
          texto: new FormControl(null, Validators.required),
        });

        this.loadData();

      },
      error => {
        this.router.navigate(['/login']);
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  inserirAlerta() {

    const formValues = this.alertaForm.value;
    const dateBrazil = new Date() // I'm in Brazil, you should have or get the user timezone.
    const dateUtc = zonedTimeToUtc(dateBrazil, 'America/Sao_Paulo')


    const localUser = this.storage.getLocalUser();
    const alerta: AlertaMensagem = new AlertaMensagem(null,formValues.texto, formValues.criticidade, dateUtc.toISOString(), "Aplicação Web", 1, localUser.email);

    this.alertaService.insert(alerta).subscribe(
      response => {
        this.loadData();
        this.toastr.success('Alerta', 'Alerta disparado com sucesso.');
      },
      error => {
        this.toastr.error('Alerta', 'inserir o alerta : ' + error);
      }
    );

    this.dispararAlerta(this.alertaDTO.id);
  }

  loadData() {
    this.alertaService.findAlertaEmitido().subscribe(
      response => {
        this.listaAlerta = response;
        this.dataSource = new MatTableDataSource(this.listaAlerta);
      },
      error => {
        this.toastr.error('Alerta', 'Falha ao carregar a lista  dos Alertas. Erro: ' + error);
      });

    this.loadAlertaEmitidoTimer();
  }

  loadAlertaEmitidoTimer() {
    setInterval (()=> {
      this.alertaService.findAlertaEmitido().subscribe(
        response => {
          this.listaAlerta = response;
          this.dataSource = new MatTableDataSource(this.listaAlerta);
          },
        error => {
          this.toastr.error('Alerta', 'Falha ao carregar a lista  dos Alertas. Erro: ' + error);
        });
    },60000)
  }

  dispararAlerta(idAlerta) {
    this.alertaService.enviarAlerta(idAlerta).subscribe(resp => {
      this.toastr.success('Alerta', 'Alerta disparado com Sucesso');
      this.loadData();
    },error => {
      this.toastr.error('Alerta', 'Falha ao disparar o Alerta. Erro: ' + error);
      this.loadData();
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'alerta-page');
  }

}
function moment(): any {
  throw new Error('Function not implemented.');
}

