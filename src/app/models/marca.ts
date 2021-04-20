import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class Marca {
  constructor(public http: HttpClient) {}
  public id: number;
  public nome: string;
}