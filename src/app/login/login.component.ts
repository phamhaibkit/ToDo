import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/todo-list']);
    }
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(res => {
        localStorage.setItem('apiKey', res.apiKey);
        this.router.navigate(['/todo-list']);
      }, err => {
        this.error = 'The username or password is incorrect';
      });
    }
  }

}
