import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeanServices } from '../services/mean-services';
import { ILoginModel } from '../models/login-model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public services: MeanServices, public cookie: CookieService) { }

  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['./register']);
  }

  loginClick(){
    let loginFields : ILoginModel = {
      email: "testAdmin@mean.com",
      password: "12345"
    }
    this.services.login(loginFields).subscribe((data) => {
      console.log(data);
      this.cookie.set('token', data.access_token);
      this.router.navigate(['./home']);
    })
  }
}
