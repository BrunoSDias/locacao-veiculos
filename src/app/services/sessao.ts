import { Reserva } from '../models/reserva';
import { Veiculo } from '../models/veiculo';

class Sessao {
  public static setUsuario(id): void {
    localStorage.setItem("usuario", id);
  }

  public static getUsuario(): string {
    const usuarioId = localStorage.getItem("usuario");
    if (usuarioId) {
      return usuarioId;
    }
  }

  public static clearUsuario(): void {
    localStorage.removeItem("usuario");
  }

  public static setReserva(reserva: Reserva): void {
    localStorage.setItem("reserva", JSON.stringify(reserva));
  }

  public static getReserva(): Reserva {
    const reserva = localStorage.getItem("reserva");
    if (reserva) {
      return JSON.parse(reserva);
    }
  }

  public static clearReserva(): void {
    localStorage.removeItem("reserva");
  }

  public static setVeiculo(veiculo: Veiculo): void {
    localStorage.setItem("veiculo", JSON.stringify(veiculo));
  }

  public static getVeiculo(): Veiculo {
    const veiculo = localStorage.getItem("veiculo");
    if (veiculo) {
      return JSON.parse(veiculo);
    }
  }

  public static clearVeiculo(): void {
    localStorage.removeItem("veiculo");
  }
}

export default Sessao;
