import { Component, OnInit, Input } from '@angular/core';
import { Veiculo } from '../models/veiculo';
import { Router } from '@angular/router'
import { PedidoService } from '../services/pedido.service';
import Sessao from '../services/sessao';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})
export class VeiculoComponent implements OnInit {

  @Input()
  veiculo: Veiculo;

  constructor(private router: Router, private pedidoService: PedidoService) { }

  ngOnInit(): void {
  }

  goToCheckout() {
    this.pedidoService.selecionaVeiculo(this.veiculo);
    this.router.navigateByUrl('/checkout');
  }

}
