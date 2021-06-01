import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva';
import { Veiculo } from '../models/veiculo';
import Sessao from '../services/sessao';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-confirmacao-pagamento',
  templateUrl: './confirmacao-pagamento.component.html',
  styleUrls: ['./confirmacao-pagamento.component.scss']
})
export class ConfirmacaoPagamentoComponent implements OnInit {
  reserva: Reserva;
  veiculo: Veiculo;

  constructor(private reservaService: ReservaService) {

  }

  ngOnInit(): void {
    this.reserva = Sessao.getReserva()
    this.veiculo = Sessao.getVeiculo();
  }

  // recebeReserva() {
  //   this.reservaService.receberReserva().pipe(
  //     tap(v => console.log(JSON.stringify(v))),
  //     take(1)
  //   )
  //   .subscribe(
  //     r => {
  //       if(r && Object.entries(r).length) {
  //         this.reserva = r
  //       }
  //     }
  //   )
  // }

}
