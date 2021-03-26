import { Component, OnInit,AfterViewInit, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/models/dto/usuarioDTO.model';
import { AppSettings } from 'src/app/shared/appsettings';
import { AppSettingsService } from 'src/app/shared/appsettings.service';
import { AppService } from 'src/app/utils/services/app.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { StorageService } from 'src/app/utils/services/storage.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {

  public usuarioDTO: UsuarioDTO;

  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  defaultSidebarColor:string;
  defaultBrandlogoColor:string;
  settings: AppSettings;

  constructor(public appService: AppService,
              private appSettingsService: AppSettingsService,
              public storage: StorageService,
              private router: Router,
              public auth: LoginService,
              public usuarioService: UsuarioService) {

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

    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings,
      () => null,
      () => {
         this.defaultSidebarColor = this.settings.defaultSidebarColor;
         this.defaultBrandlogoColor =  this.settings.defaultBrandlogoColor;
      });

  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }

}
