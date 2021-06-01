import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reserva$ = new BehaviorSubject({} as Reserva);

  constructor() { }

  addReserva(reserva: Reserva) {
    this.reserva$.next(reserva)
  }

  receberReserva() {
    return this.reserva$.asObservable();
  }
}
