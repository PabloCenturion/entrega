import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class UserListComponent {
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get<any[]>('http://localhost:8080/api/pessoas')
      .subscribe({
        next: (data) => this.usuarios = data,
        error: (err) => console.error('Erro ao carregar usuários:', err)
      });
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  detalharUsuario(id: number) {
    this.router.navigate(['/usuarios/detalhe', id]);
  }

  excluirUsuario(id: number) {
    if (!confirm('Deseja realmente excluir este usuário?')) return;

    this.http.delete(`http://localhost:8080/api/pessoas/${id}`)
      .subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.carregarUsuarios(); // atualiza lista
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir usuário!');
        }
      });
  }
}
