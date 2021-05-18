import { Injectable } from '@angular/core';
import { Veiculo } from '../models/veiculo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedido$ = new BehaviorSubject({} as Veiculo);

  constructor() { }

  selecionaVeiculo(veiculo: Veiculo) {
    this.pedido$.next(veiculo)
  }

  receberVeiculo() {
    return this.pedido$.asObservable();
  }
}
