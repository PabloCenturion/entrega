import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class UserDetailComponent implements OnInit {
  id!: number;
  nome: string = '';
  email: string = '';
  cpf: string = '';
  dataNascimento: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

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
          this.dataNascimento = usuario.dataNascimento.split('T')[0];
        },
        error: () => alert('Erro ao carregar usuário!')
      });
  }

  voltar() {
    this.router.navigate(['/usuarios']);
  }
}
