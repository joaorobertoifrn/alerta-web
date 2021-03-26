import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/models/dto/usuarioDTO.model';
import { AppSettings } from 'src/app/shared/appsettings';
import { AppSettingsService } from 'src/app/shared/appsettings.service';
import { AppService } from 'src/app/utils/services/app.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { StorageService } from 'src/app/utils/services/storage.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuarioDTO: UsuarioDTO;

  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleControlSidebar: EventEmitter<any> = new EventEmitter<any>();

  defaultBgColor:string;
  defaultTxtColor:string;
  defaultNavBottomBorder:string

  public searchForm: FormGroup;
  settings: AppSettings;

  constructor(private appService: AppService,
              private appSettingsService: AppSettingsService,
              public storage: StorageService,
              private router: Router,
              public auth: LoginService,
              public usuarioService: UsuarioService
              ) {

     }

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

    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings,
      () => null,
      () => {
        this.defaultBgColor = this.settings.defaultNavbgColor;
        this.defaultTxtColor = this.settings.defaultNavtxtColor;
        this.defaultNavBottomBorder = this.settings.defaultNavBottomBorder;
      });

  }

  logout() {
    this.appService.logout();
  }

}
