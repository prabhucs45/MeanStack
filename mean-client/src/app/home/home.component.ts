import { Component, OnInit } from '@angular/core';
import { MeanServices } from '../services/mean-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private services: MeanServices) { }

  ngOnInit(): void {
  }

  getUserList(){
    this.services.getUserList().subscribe((data) => {
      console.log(data);
    })
  }
}
