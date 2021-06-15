import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlugarService } from '../services/alugar.service';
import { ReservaService }  from '../services/reserva.service';
import { take } from 'rxjs/operators';
import { IDadosConfirmacao, IDadosPagamento } from '../static/interfaces';
import { Reserva } from '../models/reserva';
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
  dadosConfirmacao: IDadosConfirmacao = {} as IDadosConfirmacao;
  dadosPagamento: IDadosPagamento = {} as IDadosPagamento;

  constructor(public http: HttpClient, private router: Router, private alugarService: AlugarService, private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.usuario = new Usuario(this.http)
    const usuarioId = Sessao.getUsuario();
    if (usuarioId) {
      this.router.navigateByUrl('/');
    }
    this.alugarService.receberDadosConfirmacao().pipe(
      take(1)
    ).subscribe(dc => this.dadosConfirmacao = dc)
    this.alugarService.receberDadosCheckout().pipe(
      take(1)
    )
    .subscribe(dc => this.dadosPagamento = dc);
  }

  async logar() {
    this.usuario.login = this.email;
    this.usuario.senha = this.senha;

    const usuario = await this.usuario.fazerLogin();
    if (usuario && usuario.usuario && usuario.usuario.id) {
      Sessao.setUsuario(usuario.usuario.id);
      if (this.dadosConfirmacao.token_pagamento &&
          this.dadosConfirmacao.hash_comprador &&
          this.dadosPagamento.veiculoId &&
          this.dadosPagamento.dias) {
        Reserva.alugar(this.http, this.dadosPagamento.veiculoId, this.dadosPagamento.dias, this.dadosConfirmacao.token_pagamento, this.dadosConfirmacao.hash_comprador).then(res => {
          this.alugarService.atualizaDadosConfirmacao({
            reserva_id: res.id,
            token_pagamento: this.dadosConfirmacao.token_pagamento,
            hash_comprador: this.dadosConfirmacao.hash_comprador,
          })
          this.reservaService.addReserva(res as Reserva);
          this.router.navigateByUrl("/confirmacao_pagamento");
        })
        return
      }
      this.router.navigateByUrl('/');
    }
  }

}
