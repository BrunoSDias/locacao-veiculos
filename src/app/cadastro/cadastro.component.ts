import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import Sessao from '../services/sessao';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  usuario: Usuario

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.http);
  }

  async salvar() {
    const usuario = await this.usuario.cadastrar();
    if (usuario && usuario.id) {
      Sessao.setUsuario(usuario.id);
      this.router.navigateByUrl('/');
    }
  }

}
