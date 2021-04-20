import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Veiculo } from '../models/veiculo';
import Sessao from '../services/sessao';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  veiculos: Veiculo[];

  constructor(private router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    const usuarioId = Sessao.getUsuario();
    if (!usuarioId) {
      this.router.navigateByUrl('/login');
      return
    }
    this.loadVeiculos();
  }

  async loadVeiculos() {
    this.veiculos = await Veiculo.todos(this.http)
  }

}
