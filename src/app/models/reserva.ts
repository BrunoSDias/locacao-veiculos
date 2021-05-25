import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Sessao from '../services/sessao';

export class Reserva {
  constructor(public http: HttpClient) {}
  public veiculo_id: number
  public tempo_de_espera: number;
  public valor_alugado: number;
  public reservado_de: string;
  public reservado_ate: string;
  public pagamento_no_destino: boolean;
  public status: string;
  public usuario_id: number;

  static async alugar(http: HttpClient, veiculoId: number, dias: number, token: string, senderHash: string) {
    return await http.post<{reserva_id: number}>(`${environment.apiUrl}/alugar/${veiculoId}.json`, {
      dias,
      token,
      senderHash,
    },
    {
      headers: new HttpHeaders({
        UsuarioToken: Sessao.getUsuario(),
      }),
    }
    ).toPromise();
  }
}
