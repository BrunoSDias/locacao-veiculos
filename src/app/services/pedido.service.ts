import { Injectable } from '@angular/core';
import { Veiculo } from '../models/veiculo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedido$ = new Subject();

  constructor() { }

  selecionaVeiculo(veiculo: Veiculo) {
    this.pedido$.next(veiculo)
  }

  receberVeiculo() {
    return this.pedido$.asObservable();
  }
}
