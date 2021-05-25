export interface IDadosPagamento {
  numero_cartao: string;
  nome_cartao: string;
  dias: number;
  veiculoId: number;
  data_validade: string;
  cvv: string;
  sessao_id: string;
  total: number;
  bandeira: string;
  mes_expiracao: string;
  ano_expiracao: string;
}
