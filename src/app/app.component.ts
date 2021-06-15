import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import Sessao from './services/sessao';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'locacao-veiculos';
  usuarioId: string;
  loading: boolean = false;

  constructor(private router: Router, private loadingService: LoadingService){}

  ngOnInit() {
    this.usuarioId = Sessao.getUsuario();
    this.loadingService.statusLoading().subscribe(l => this.loading = l)
  }

  logOut() {
    Sessao.clearUsuario();
    this.router.navigateByUrl('/login');
    this.usuarioId = null;
  }
}
