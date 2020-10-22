import { Usuario } from './../models/Usuario';
import { Injectable } from '@angular/core';
import { ArmazenamentoService } from './armazenamento.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public listaUsuarios = [];

  constructor(private armazenamentoService: ArmazenamentoService) { }

  public async buscarTodos() {
    this.listaUsuarios = await this.armazenamentoService.pegarDados('usuarios');

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }
  }

  public async salvar(usuario: Usuario) {
    await this.buscarTodos();

    if (!usuario) {
      return false;
    }

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }

    this.listaUsuarios.push(usuario);

    return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios);
  }

  public async login(email: string, senha: string) {
    let usuario: Usuario;

    await this.buscarTodos();

    const listaTemporaria = this.listaUsuarios.filter(usuarioArmazenado => {
      return (usuarioArmazenado.email == email && usuarioArmazenado.senha == senha);
    }); // retorna um array;

    if (listaTemporaria.length > 0) {
      usuario = listaTemporaria.reduce(item => item);
    }

    return usuario;
  }

  public salvarUsuarioLogado(usuario: Usuario) {
    delete usuario.senha;
    this.armazenamentoService.salvarDados('usuarioLogado', usuario);
  }

  public async buscarUsuarioLogado() {
    return await this.armazenamentoService.pegarDados('usuarioLogado');
  }

  public async removerUsuarioLogado() {
    return await this.armazenamentoService.removerDados('usuarioLogado');
  }

  // Função assincrona que recebe uma variável usuário e a converte no tipo "Usuario"
  public async alterar(usuario: Usuario) {
    // Se usuário não for válido
    if (!usuario) {
      // Retorna falso
      return false;
    }

    // Chama e espera a função buscar todos os usuários
    await this.buscarTodos();

    // Atribui a constante "index" a posição do usuário no array de usuários
    const index = this.listaUsuarios.findIndex(usuarioArmazenado => {
      // Retorna se o email do usuário for igual ao usuário armazenado
      return usuarioArmazenado.email == usuario.email;
    });

    // Cria um usuário temporario que é igual ao usuário encontrado na lista de usuários e a converte no tipo "Usuario"
    const usuarioTemporario = this.listaUsuarios[index] as Usuario;

    // Recupera a senha salva do usuário e à atribui ao usuário novamente
    usuario.senha = usuarioTemporario.senha;

    // Chama a lista de usuarios na posição do usuário desejado e passa a variável usuário
    this.listaUsuarios[index] = usuario;

    // Aguarda e retorna o salvamento dos dados do usuário
    return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios);
  }
}
