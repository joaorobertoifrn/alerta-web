import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioDTO } from 'src/app/models/dto/usuarioDTO.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AppService } from 'src/app/utils/services/app.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { StorageService } from 'src/app/utils/services/storage.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public usuarioDTO: UsuarioDTO;
  usuarioForm: FormGroup;

  constructor(
    private router: Router,
    public auth: LoginService,
    public usuarioService: UsuarioService,
    public storage: StorageService
    ) {}

  ngOnInit(): void {
    const localUser = this.storage.getLocalUser();
    if (localUser) {
      this.auth.refreshToken().subscribe(
        responseAuth => {
          this.auth.successfulLogin(responseAuth.headers.get('Authorization'));
        },
        error => {
          this.router.navigate(['/login']);
        });

      this.usuarioService.findByEmail(localUser.email).subscribe(
        responseUser => {
          this.usuarioDTO = responseUser as UsuarioDTO;
        },
        error => {});

    } else {
      this.router.navigate(['/login']);
    }
  }

}
