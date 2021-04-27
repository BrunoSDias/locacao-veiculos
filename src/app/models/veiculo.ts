import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Sessao from '../services/sessao';
import { Marca } from './marca';

export class Veiculo {
  constructor(public http: HttpClient) {}
  public id: number;
  public nome: string;
  public cor: string;
  public qnt_passageiros: number;
  public placa: string;
  public valor: string;
  public marca: Marca;

  static async todos(http: HttpClient) {
    return await http.get<Veiculo[]>(`${environment.apiUrl}/veiculos_usuarios.json`, {
      headers: new HttpHeaders({
        UsuarioToken: Sessao.getUsuario(),
      })
    }).toPromise();
  }
}