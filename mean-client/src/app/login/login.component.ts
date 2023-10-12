import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeanServices } from '../services/mean-services';
import { ILoginModel } from '../models/login-model';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public email: FormControl | undefined;
  public password: FormControl | undefined;

  constructor(public router: Router, public services: MeanServices, public cookie: CookieService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: this.email,
      password: this.password
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['./register']);
  }

  loginClick() {
    let loginFields: ILoginModel = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.services.login(loginFields).subscribe((data) => {
      sessionStorage.setItem("userDetails", JSON.stringify(data.data));
      this.cookie.set('token', data.access_token);
      this.router.navigate(['./home']);
    })
  }
}
