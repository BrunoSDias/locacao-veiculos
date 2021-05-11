import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Veiculo } from '../models/veiculo';
import { tap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Sessao from '../services/sessao';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public veiculo: Veiculo;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.veiculo = Sessao.getVeiculo();
  }

  recebeVeiculo() {
    this.pedidoService.receberVeiculo().pipe(
      tap(v => console.log(JSON.stringify(v))),
      take(1)
    )
    .subscribe(
      v => this.veiculo = v as Veiculo
    )
  }

}
