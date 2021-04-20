import { Component, OnInit, Input } from '@angular/core';
import { Veiculo } from '../models/veiculo';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})
export class VeiculoComponent implements OnInit {

  @Input()
  veiculo: Veiculo;

  constructor() { }

  ngOnInit(): void {
  }

}
