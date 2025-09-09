import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // Login estático: usuário admin, senha 1234
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/usuarios']); // Redireciona para a lista de usuários
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }
}
