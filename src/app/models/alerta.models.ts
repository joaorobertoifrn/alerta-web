/*
{
    "id": 2,
    "texto": "Alerta 02 - Cuidado",
    "usuario": {
        "id": 2,
        "nome": "Administrador",
        "email": "admin@ifrn.edu.br",
        "imagem": "assets/img/user_default.png"
    },
    "instante": "10/04/2021 10:35",
    "criticidade": {
        "descricao": "Cuidado"
    },
    "equipamento": {
        "id": 2,
        "descricao": "Sensor de Fumaça",
        "local": {
            "id": 1,
            "descricao": "Laboratorio de Informatica 01"
        },
        "ipAddress": "192.168.0.11",
        "tipoEquipamento": [
            "SENSOR"
        ]
    },
    "disparado": 1
}
*/

import { Usuario } from "./usuario.model";

export interface Criticidade {
  id: number;
  descricao: string;
}

export interface Local {
  id: number;
  descricao: string;
}

export interface Equipamento {
  id: number;
  descricao: string;
  local: Local;
  ipAddress: string;
  tipoEquipamento: string[];
}

export interface Alerta {
  id: number;
  texto: string;
  usuario: Usuario;
  instante: string;
  criticidade: Criticidade;
  equipamento: Equipamento;
  disparado: number;
}
