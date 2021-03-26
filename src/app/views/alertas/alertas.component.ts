import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertaDTO } from 'src/app/models/dto/alertaDTO.model';
import { LoginService } from 'src/app/utils/services/login.service';
import { AlertaService } from '../../utils/services/alerta.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  public alertas: AlertaDTO[] = [];
  public alertaDTO: AlertaDTO;
  public alertaForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: LoginService,
    public alertaService: AlertaService,
    private toastr: ToastrService,
  ) {
      this.alertaForm = this.formBuilder.group({
      id: ['', []],
      texto: ['', [Validators.required]],
      criticidade: ['', [Validators.required]]});
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

  enviarAlerta() {
    this.alertaService.insert(this.alertaForm.value).subscribe(
      response => {
          this.alertaDTO = response;
          this.alertaService.enviarAlerta(this.alertaDTO.id).subscribe(response => {},error => {});

        this.toastr.success('Alerta', 'Alerta enviado com Sucesso');

        this.loadData();
      },
      error => {
        this.toastr.error('Alerta', 'Ao enviar o alerta : ' + error);
      }
    );
  }

  loadData() {
    this.alertaService.findAll().subscribe(
      response => {
        this.alertas = response;
      },
      error => {}
    );
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'alerta-page');
  }

}
