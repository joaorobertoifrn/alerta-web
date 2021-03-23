import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  public alertaForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'alerta-page');
    this.alertaForm = new FormGroup({
      criticidade: new FormControl(null, Validators.required),
      mensagem: new FormControl(null, Validators.required),
    });
  }

  enviarAlerta() {
    if (this.alertaForm.valid) {
      this.appService.login();
    } else {
      this.toastr.error('Alerta', 'Alerta Enviado com sucesso');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'alerta-page');
  }

}
