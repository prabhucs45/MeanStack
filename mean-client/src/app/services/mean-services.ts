import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILoginModel } from "../models/login-model";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { IRegisterModel } from "../models/register-model";

@Injectable({
    providedIn: 'root'
})

export class MeanServices {
    access_token: any
    constructor(private http: HttpClient, private cookie: CookieService) {
       
    }

    login(loginModel: ILoginModel) {
     return  this.http.post<any>(environment.apiUrl + 'auth/login', loginModel, { withCredentials: true }).
            pipe(map(loginDetails => {
                return loginDetails;
            }));
    }

    getUserList(){
        let options = this.getCookieValue();
        return  this.http.get<any>(environment.apiUrl + 'user', options).
        pipe(map(userDetails => {
            return userDetails;
        }));
    }

    register(registerModel: IRegisterModel): any {
        return this.http.post<any>(environment.apiUrl + 'auth/register', registerModel).
        pipe(map(registerDetails => {
            return registerDetails;
        }));
    }

    getCookieValue() : any{
        this.access_token = this.cookie.get('token');
        let headers = new HttpHeaders({
            'Authorization': this.access_token
        });

        return {headers : headers};
    }

    
}
