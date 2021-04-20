import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Sessao from './services/sessao';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'locacao-veiculos';
  usuarioId: number;

  constructor(private router: Router){}

  ngOnInit() {
    this.usuarioId = +Sessao.getUsuario();
  }

  logOut() {
    Sessao.clearUsuario();
    this.router.navigateByUrl('/login');
    this.usuarioId = null;
  }
}
