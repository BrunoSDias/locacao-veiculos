export interface IDadosPagamento {
  numero_cartao: string;
  nome_cartao: string;
  data_validade: string;
  cvv: string;
  sessao_id: string;
  total: number;
}
