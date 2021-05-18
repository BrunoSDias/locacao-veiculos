import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Router } from '@angular/router';
import { Veiculo } from '../models/veiculo';
import { tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlugarService } from '../services/alugar.service';
import { IDadosPagamento } from '../static/interfaces';
import { Subscription } from 'rxjs';
import Sessao from '../services/sessao';

declare const PagSeguroDirectPayment

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  veiculo: Veiculo;
  dias: number = 1;
  total: number;
  sessionId: string;
  numero_cartao: string;
  nome_cartao: string;
  data_validade: string;
  cvv: string;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private http: HttpClient,
    private alugarService: AlugarService
  ) { }

  ngOnInit(): void {
    PagSeguroDirectPayment.setSessionId('');
    this.recebeVeiculo();
  }

  recebeVeiculo() {
    this.pedidoService.receberVeiculo().pipe(
      tap(v => console.log(JSON.stringify(v))),
      take(1)
    )
    .subscribe(
      v => {
        if(v && Object.entries(v).length) {
          this.veiculo = v as Veiculo
          (async() => {
            this.sessionId = (await Veiculo.getSession(this.http)).sessionId;
          })()
          this.total = parseFloat(this.veiculo.valor)
          return
        }
        this.router.navigateByUrl('/')
      }
    )
  }

  previewTotal() {
    this.total = parseFloat(this.veiculo.valor) * this.dias;
  }

  finalizar() {
    if (!this.numero_cartao) {
      alert('Por favor, preencha os números do seu cartão')
    }
    else if (!this.nome_cartao) {
      alert('Por favor, preencha o nome do seu cartão')
    }
    else if (!this.data_validade) {
      alert('Por favor, preencha a data de validade do seu cartão')
    }
    else if (!this.cvv) {
      alert('Por favor, preencha o cvv do seu cartão')
    }

    const dadosPagamento = {
      numero_cartao: this.numero_cartao,
      nome_cartao: this.nome_cartao,
      data_validade: this.data_validade,
      cvv: this.cvv,
      sessao_id: this.sessionId,
      total: this.total
    }

    this.alugarService.preencheDadosCheckout(dadosPagamento as IDadosPagamento)

  }

}
