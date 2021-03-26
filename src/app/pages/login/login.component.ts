import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais.model';
import { AppService } from 'src/app/utils/services/app.service';
import { LoginService } from 'src/app/utils/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isAuthLoading = false;

  creds: Credenciais = {
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService,
    public auth: LoginService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/']);
      },
      error => {this.router.navigate(['/login']); });
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  login() {
      this.creds.email = this.loginForm.value.email;
      this.creds.senha = this.loginForm.value.password;
      this.auth.authenticate(this.creds).subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.toastr.success('Bem Vindo');
        this.router.navigate(['/']);
      },
      error => {
        this.toastr.error('Falha de Login : ' + error);
      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}
