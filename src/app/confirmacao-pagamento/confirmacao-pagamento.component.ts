import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { AlugarService } from '../services/alugar.service';
import { Reserva } from '../models/reserva';
import { Veiculo } from '../models/veiculo';
import Sessao from '../services/sessao';
import { Subscription } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmacao-pagamento',
  templateUrl: './confirmacao-pagamento.component.html',
  styleUrls: ['./confirmacao-pagamento.component.scss']
})
export class ConfirmacaoPagamentoComponent implements OnInit {
  reserva: Reserva;
  veiculo: Veiculo;
  subscriptions: Subscription[] = [];

  constructor(private reservaService: ReservaService, private alugarService: AlugarService, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.recebeReserva();
    this.veiculo = Sessao.getVeiculo();
  }

  recebeReserva() {
    this.subscriptions.push(
      this.reservaService.receberReserva()
      .subscribe(
        r => {
          if(r && Object.entries(r).length) {
            this.reserva = r
          }
        }
      )
    )
  }

  finalizaPagamento() {
    this.subscriptions.push(
      this.alugarService.receberDadosConfirmacao()
      .subscribe(
        async (c) => {
          if (c && Object.entries(c).length) {
            const response = await Reserva.finalizar_pagamento(this.http, c);
            if (response && response.error) {
              alert(response.error[0].message);
            } else {
              alert("Pagamento realizado com sucesso!");
              this.router.navigateByUrl('/');
            }
          }
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe())
  }

}
