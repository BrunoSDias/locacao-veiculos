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

  public static setVeiculo(veiculo: Veiculo): void {
    localStorage.setItem("veiculo", JSON.stringify(veiculo))
  }

  public static getVeiculo(): Veiculo {
    const veiculo = localStorage.getItem("veiculo")
    if (veiculo) {
      return JSON.parse(veiculo) as Veiculo
    }
  }
}

export default Sessao;
