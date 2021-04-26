import { Renderer2, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/utils/services/login.service';
import { UsuarioService } from 'src/app/utils/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  // lista de Usuarios
  public usuarios: Usuario[] = [];
  public QtdUsuarios: number;
  usuario: Usuario;
  usuarioForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: LoginService,
    private toastr: ToastrService,
    public usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.formBuilder.group({
      id: ['', []],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', []],
      imagem: ['', []]
    });

    this.inicializarForm();
   }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'alerta-page');

    this.auth.refreshToken().subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.loadData();
      },
      error => {
        this.router.navigate(['/login']);
      }
    );

  }

  loadData() {
    this.usuarioService.findAll().subscribe(
      response => {
        this.usuarios = response;
        this.QtdUsuarios = this.usuarios.length;
      },
      error => {}
    );
  }

  salvarUsuario() {
    if (this.usuarioForm.controls.id.value == null) {
      this.cadastrarUsuario();
    } else {
        this.atualizaUsuario();
    }
  }

  atualizaUsuario() {
    this.usuarioService.update(this.usuarioForm.value).subscribe(
      response => {
        this.toastr.success('Usuário', 'Usuário Alterado com Sucesso');
        this.inicializarForm();
        this.loadData();
      },
      error => {
        this.toastr.error('Usuário', 'Falha ao Cadastrar Usuário : ' + error);
      }
    );
  }


  cadastrarUsuario() {
    this.usuarioService.insert(this.usuarioForm.value).subscribe(
      response => {
        this.toastr.success('Usuário', 'Usuário Cadastrado com Sucesso');
        this.inicializarForm();
        this.loadData();
      },
      error => {
        this.toastr.error('Usuário', 'Falha ao Cadastrar Usuário : ' + error);
      }
    );
  }

  deletarUsuario(usuario_id) {
    this.usuarioService.delete(usuario_id).subscribe(
      response => {
        this.toastr.success('Usuário', 'Usuário Deletado com Sucesso');
        this.inicializarForm();
        this.loadData();
      },
      error => {
        this.toastr.error('Usuário', 'Falha ao Deletar o Usuário : ' + error);
      }
    );
  }

  carregarUsuario(usuario_id) {
    if (usuario_id) {
      this.usuarioService.findById(usuario_id).subscribe(
        response => {
          this.usuario = response;
          if (this.usuario) {
            this.usuarioForm.controls.id.setValue(this.usuario.id);
            this.usuarioForm.controls.nome.setValue(this.usuario.nome);
            this.usuarioForm.controls.email.setValue(this.usuario.email);
            this.usuarioForm.controls.imagem.setValue(this.usuario.imagem);
          }
        },
        error => {}
      );
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'usuario-page');
  }

  inicializarForm() {
    this.usuario = null;
    this.usuarioForm.controls.id.setValue(null);
    this.usuarioForm.controls.nome.setValue(null);
    this.usuarioForm.controls.email.setValue(null);
    this.usuarioForm.controls.imagem.setValue(null);
    this.usuarioForm.controls.senha.setValue(null);
  }

}


