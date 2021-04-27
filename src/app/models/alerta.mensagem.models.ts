import { TestBed } from '@angular/core/testing';
/*
{
  "id": 1,
  "texto": "Alerta Perigo. Keep Out NOW",
  "instante": "30/09/2019 01:32",
  "criticidade": "Alta",
  "equipamento": "Sensor de Fogo",
  "localEquipamento": "Laboratorio de Informatica 01"
}
*/
export class AlertaMensagem {
  id: string;
  texto: string;
  instante: string;
  criticidade: string;
  equipamento: string;
  disparado: number;
  usuario: string;

  constructor(id: string, texto: string, criticidade: string, instante: string, equipamento: string, disparo: number, usuario:string){
    this.id = null;
    this.texto = texto;
    this.criticidade = criticidade;
    this.instante = instante;
    this.equipamento = equipamento;
    this.disparado = disparo;
    this.usuario = usuario;
  }


}
