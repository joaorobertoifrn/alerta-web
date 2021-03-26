import { Component, OnInit,ViewChild,HostListener,ElementRef,Renderer2 } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';
import { StorageService } from '../../../../utils/services/storage.service';
import { UsuarioDTO } from '../../../../models/dto/usuarioDTO.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/utils/services/login.service';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.css']
})
export class UserDropdownMenuComponent implements OnInit {

  public usuarioDTO: UsuarioDTO;

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private appService: AppService,
              public storage: StorageService,
              private router: Router,
              public auth: LoginService,
              public usuarioService: UsuarioService
              ) { }

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

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  logout() {
    this.appService.logout();
  }

}
