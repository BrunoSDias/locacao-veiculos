import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDadosPagamento, IDadosConfirmacao } from '../static/interfaces';
import { Reserva } from '../models/reserva';
import { HttpClient } from '@angular/common/http';
import { ReservaService } from './reserva.service';
import { LoadingService } from './loading.service';
import Sessao from './sessao';
import { Router } from '@angular/router';

declare const PagSeguroDirectPayment;

@Injectable({
  providedIn: 'root'
})
export class AlugarService {
  private dadosPagamento$ = new BehaviorSubject({} as IDadosPagamento);
  private dadosConfirmacao$ = new BehaviorSubject({} as IDadosConfirmacao)
  private dados: IDadosPagamento;
  senderHash: string;

  constructor(private http: HttpClient, private router: Router, private reservaService: ReservaService, private ngZone: NgZone, private loadingService: LoadingService) {
    this.receberDadosCheckout()
    .subscribe(
      d => {
        if(d && Object.entries(d).length) {
          this.dados = d as IDadosPagamento;
          this.metodosPagamento();
        }
      }

    )
  }

  toogleLoading(status: boolean) {
    this.ngZone.run(() => this.loadingService.toggleLoading(status))
  }

  preencheDadosCheckout(dadosPagamento: IDadosPagamento) {
    this.dadosPagamento$.next(dadosPagamento)
  }

  receberDadosCheckout() {
    return this.dadosPagamento$.asObservable();
  }

  atualizaDadosConfirmacao(dadosConfirmacao: IDadosConfirmacao) {
    this.dadosConfirmacao$.next(dadosConfirmacao)
  }

  receberDadosConfirmacao() {
    return this.dadosConfirmacao$.asObservable();
  }

  finalizarPagamento() {
    this.metodosPagamento()
  }

  metodosPagamento() {
    this.toogleLoading(true);
    PagSeguroDirectPayment.getPaymentMethods({
      amount: this.dados.total,
      success: (response) => {
        this.hashPagamento()
      },
      error: (response) => {
        this.toogleLoading(false);
        alert("Ocorreu um erro ao tentar obter os métodos de pagamento, por favor tente novamente");
        console.log("ERRO: ", response)

      },
      complete: (response) => {

      }
    });
  }

  hashPagamento() {
    PagSeguroDirectPayment.onSenderHashReady((response) => {
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      this.senderHash = response.senderHash; //Hash estará disponível nesta variável.
      this.bandeira();
    });
  }

  bandeira() {
    const bin = this.dados.numero_cartao.substring(0, 6)
    PagSeguroDirectPayment.getBrand({
      cardBin: bin,
      success: (response) => {
        this.dados.bandeira = response.brand.name;
        this.parcelamento();
      },
      error: (response) => {
        this.toogleLoading(false);
        alert("Ocorreu um erro ao checar a bandeira do cartão, por favor tente novamente");
        console.log("ERRO: ", response)
        //tratamento do erro
      },
      complete: (response) => {
        //tratamento comum para todas chamadas
      }
    });
  }

  parcelamento() {
    PagSeguroDirectPayment.getInstallments({
      amount: this.dados.total,
      maxInstallmentNoInterest: 12,
      brand: this.dados.bandeira,
      success: (response) => {
        this.tokenCartao();
      },
        error: (response) => {
        this.toogleLoading(false);
          console.log("ERRO: ", response)
          alert("Ocorreu um erro ao tentar gerar o parcelamento, por favor tente novamente");
            // callback para chamadas que falharam.
      },
        complete: (response) => {
            // Callback para todas chamadas.
      }
    });
  }

  tokenCartao() {
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.dados.numero_cartao, // Número do cartão de crédito
      brand: this.dados.bandeira, // Bandeira do cartão
      cvv: this.dados.cvv, // CVV do cartão
      expirationMonth: this.dados.mes_expiracao, // Mês da sexpiração do cartão
      expirationYear: this.dados.ano_expiracao, // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: (response) => {
        const usuario = Sessao.getUsuario();
        if (usuario) {
          Reserva.alugar(this.http, this.dados.veiculoId, this.dados.dias, response.card.token, this.senderHash).then(res => {
            this.atualizaDadosConfirmacao({
              reserva_id: res.id,
              token_pagamento: response.card.token,
              hash_comprador: this.senderHash,
            })
            this.toogleLoading(false);
            this.reservaService.addReserva(res as Reserva);
            this.ngZone.run(() => this.router.navigateByUrl("/confirmacao_pagamento"))
          })
        }
        else {
          this.atualizaDadosConfirmacao({
            reserva_id: null,
            token_pagamento: response.card.token,
            hash_comprador: this.senderHash,
          })
          this.toogleLoading(false);
          this.ngZone.run(() => this.router.navigateByUrl("/login"))
        }
      },
      error: (response) => {
        this.toogleLoading(false);
        alert("Ocorreu um erro, por favor tente novamente");
        console.log("ERRO: ", response)
               // Callback para chamadas que falharam.
      },
      complete: (response) => {
           // Callback para todas chamadas.
      }
    });
  }
}
