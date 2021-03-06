/*
{
  "id": 1,
  "texto": "Alerta Perigo. Keep Out NOW",
  "instante": "30/09/2019 01:32",
  "criticidade": "Alta",
  "equipamento": "Sensor de Fogo",
  "locallizacao": "Laboratorio de Informatica 01"
}
*/
export interface AlertaDTO {
  id: string;
  texto: string;
  instante: string;
  criticidade: string;
  equipamento: string;
  localizacao: string;
  disparado: string;
}
