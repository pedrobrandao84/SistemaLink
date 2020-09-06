import { Usuario } from 'src/app/usuario/Model/usuario';

export class Link {
    idEnderecoLink: number;
    nome: string;
    url: string;
    qtdClicks: number;
    dtCriacao: string;
    usuario: Usuario;
}