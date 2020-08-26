import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparaValidator } from '../validators/comparacao-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegister: FormGroup;

  public mensagens_validacao = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres!' }
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O CPF deve ter pelo menos 11 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O CPF deve ter no máximo 14 caracteres!' },
      { tipo: 'invalido', mensagem: 'CPF inválido' }
    ],
    data_de_nascimento: [
      { tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório!' }
    ],
    genero: [
      { tipo: 'required', mensagem: 'Escolha um gênero!' }
    ],
    celular: [
      { tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 10 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracteres!' }
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo senha é obrigatório!' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' }
    ],
    confirmar_senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar a senha!' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a Senha!' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formRegister = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],
      data_de_nascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmar_senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: ComparaValidator('senha', 'confirmar_senha')
    });
  }

  ngOnInit() {
  }

  public register() {
    if (this.formRegister.valid) {
      console.log('Formulário válido!');
      this.router.navigateByUrl('/home');
    } else {
      console.log('Formulário Inválido');
    }
  }

}
