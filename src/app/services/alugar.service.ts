import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDadosPagamento } from '../static/interfaces';

declare const PagSeguroDirectPayment;



@Injectable({
  providedIn: 'root'
})
export class AlugarService {
  private dadosPagamento$ = new BehaviorSubject({} as IDadosPagamento);
  private dados: IDadosPagamento;

  constructor() {
    this.receberDadosCheckout()
    .subscribe(
      d => {
        this.dados = d as IDadosPagamento;
        this.metodosPagamento();
      }

    )
  }

  preencheDadosCheckout(dadosPagamento: IDadosPagamento) {
    this.dadosPagamento$.next(dadosPagamento)
  }

  receberDadosCheckout() {
    return this.dadosPagamento$.asObservable();
  }

  finalizarPagamento() {
    this.metodosPagamento()
  }

  metodosPagamento() {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 500.00,
      success: function(response) {
        this.hashPagamento()
      },
      error: function(response) {

      },
      complete: function(response) {

      }
    });
  }

  hashPagamento() {
    PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      var hash = response.senderHash; //Hash estará disponível nesta variável.
      this.bandeira();
    });
  }

  bandeira() {
    PagSeguroDirectPayment.getBrand({
      cardBin: 411111,
      success: function(response) {
        this.parcelamento();
      },
      error: function(response) {
        //tratamento do erro
      },
      complete: function(response) {
        //tratamento comum para todas chamadas
      }
    });
  }

  parcelamento() {
    PagSeguroDirectPayment.getInstallments({
      amount: 118.80,
      maxInstallmentNoInterest: 2,
      brand: 'visa',
      success: function(response){
        this.tokenCartao();
      },
        error: function(response) {
            // callback para chamadas que falharam.
      },
        complete: function(response){
            // Callback para todas chamadas.
      }
    });
  }

  tokenCartao() {
    PagSeguroDirectPayment.createCardToken({
      cardNumber: '4111111111111111', // Número do cartão de crédito
      brand: 'visa', // Bandeira do cartão
      cvv: '013', // CVV do cartão
      expirationMonth: '12', // Mês da expiração do cartão
      expirationYear: '2026', // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: function(response) {
           // Retorna o cartão tokenizado.
      },
      error: function(response) {
               // Callback para chamadas que falharam.
      },
      complete: function(response) {
           // Callback para todas chamadas.
      }
    });
  }
}
