import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class UserCreateComponent {
  nome: string = '';
  email: string = '';
  cpf: string = '';
  dataNascimento: string = ''; // formato 'YYYY-MM-DD'

  constructor(private http: HttpClient, private router: Router) {}

  criarUsuario() {
    // Valida campos obrigatórios
    if (!this.nome || !this.email || !this.cpf || !this.dataNascimento) {
      alert('Preencha todos os campos!');
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Digite um e-mail válido!');
      return;
    }

    // Validação de CPF simples: 11 dígitos
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(this.cpf)) {
      alert('CPF inválido! Deve conter 11 números.');
      return;
    }

    // Validação de data de nascimento (não futura)
    const hoje = new Date();
    const nascimento = new Date(this.dataNascimento);
    if (nascimento > hoje) {
      alert('Data de nascimento inválida! Não pode ser futura.');
      return;
    }

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento
    };

    this.http.post('http://localhost:8080/api/pessoas', novoUsuario)
      .subscribe({
        next: () => {
          alert('Usuário criado com sucesso!');
          this.router.navigate(['/usuarios']); // redireciona para lista de usuários
        },
        error: (err) => {
          console.error(err);
          if (err.status === 409) {
            alert('Erro: CPF ou e-mail já cadastrado!');
          } else if (err.status === 400) {
            alert('Erro: Dados inválidos!');
          } else {
            alert('Erro ao criar usuário! Verifique se o back-end está rodando.');
          }
        }
      });
  }
}
