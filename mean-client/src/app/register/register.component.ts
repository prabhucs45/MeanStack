import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IRegisterModel } from '../models/register-model';
import { MeanServices } from '../services/mean-services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public firstName: FormControl | undefined;
  public lastName: FormControl | undefined;
  public userName: FormControl | undefined;
  public email: FormControl | undefined;
  public password: FormControl | undefined;
  
  constructor( private formBuilder: FormBuilder, private services: MeanServices) { 
    this.registerForm = formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: this.password
    })
  }

  ngOnInit(): void {
  }


  register(){
    let registerModel : IRegisterModel = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      username: this.registerForm.get('userName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.services.register(registerModel).subscribe((data:any) => {
      console.log(data);
      alert('Successfully Registered!!!');
    })


  }


}
