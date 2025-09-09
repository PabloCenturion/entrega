import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class UserEditComponent implements OnInit {
  id!: number;
  nome: string = '';
  email: string = '';
  cpf: string = '';
  dataNascimento: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.http.get<any>(`http://localhost:8080/api/pessoas/${this.id}`)
      .subscribe({
        next: (usuario) => {
          this.nome = usuario.nome;
          this.email = usuario.email;
          this.cpf = usuario.cpf;
          this.dataNascimento = usuario.dataNascimento.split('T')[0]; // converte para YYYY-MM-DD
        },
        error: () => alert('Erro ao carregar usuário!')
      });
  }

  salvarAlteracoes() {
    const usuarioAtualizado = { nome: this.nome, email: this.email, cpf: this.cpf, dataNascimento: this.dataNascimento };

    this.http.put(`http://localhost:8080/api/pessoas/${this.id}`, usuarioAtualizado)
      .subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar usuário!');
        }
      });
  }
}
