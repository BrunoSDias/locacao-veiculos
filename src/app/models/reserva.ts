import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IDadosConfirmacao } from '../static/interfaces';
import Sessao from '../services/sessao';

export class Reserva {
  constructor(public http: HttpClient) {}
  public id: number;
  public veiculo_id: number
  public tempo_de_espera: number;
  public valor_alugado: number;
  public reservado_de: string;
  public reservado_ate: string;
  public pagamento_no_destino: boolean;
  public status: string;
  public usuario_id: number;

  static async alugar(http: HttpClient, veiculoId: number, dias: number, token: string, senderHash: string) {
    const usuario = Sessao.getUsuario();
    let header = {}
    if (usuario) {
      header = {
        headers: new HttpHeaders({
          UsuarioToken: Sessao.getUsuario(),
        })
      }
    }
    return await http.post<Reserva>(`${environment.apiUrl}/alugar/${veiculoId}.json`, {
      dias,
      token,
      senderHash,
    },
    header
    ).toPromise();
  }

  static async finalizar_pagamento(http: HttpClient, dadosConfirmacao: IDadosConfirmacao) {
    const usuario = Sessao.getUsuario();
    let header = {}
    if (usuario) {
      header = {
        headers: new HttpHeaders({
          UsuarioToken: Sessao.getUsuario(),
        })
      }
    }
    return await http.post<any>(`${environment.apiUrl}/finalizar_pagamento.json`, dadosConfirmacao, header).toPromise();
  }
}
