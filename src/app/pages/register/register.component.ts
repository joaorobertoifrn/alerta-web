import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      matricula: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
    });
  }
  register() {
    if (this.registerForm.valid) {
      this.appService.register();
      this.toastr.info('Cadastro efetuado com sucesso !');
    } else {
      this.toastr.error('Falha ao cadastrar o usuário !');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }

}
