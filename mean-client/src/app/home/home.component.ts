import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MeanServices } from '../services/mean-services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  userName: string = '';

  constructor(private services: MeanServices, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    let userDetails = sessionStorage.getItem('userDetails')?.toString();
    this.userName = JSON.parse(userDetails??'')['firstName'];
  }

  getUserList(){
    this.services.getUserList().subscribe((data) => {
      console.log(data);
    })
  }

  registerAdmin(){

  }

  getUserById(){
    
  }

  clearStorage(){
    localStorage.clear();
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }
}
