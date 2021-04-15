import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.http)
  }
  
  logar() {
    this.usuario.login = this.email;
    this.usuario.senha = this.senha;

    this.usuario.fazerLogin()
  }

}
