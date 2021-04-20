import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Sessao from '../services/sessao';

import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  senha: string;
  usuario: Usuario;

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.http)
    const usuarioId = Sessao.getUsuario();
    if (usuarioId) {
      this.router.navigateByUrl('/');
    }
  }
  
  async logar() {
    this.usuario.login = this.email;
    this.usuario.senha = this.senha;
    
    const usuario = await this.usuario.fazerLogin();
    if (usuario && usuario.usuario && usuario.usuario.id) {
      Sessao.setUsuario(usuario.usuario.id);
      this.router.navigateByUrl('/');
    }
  }

}
