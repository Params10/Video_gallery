import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from './endPoint.constants';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(public http: HttpClient) { }

    login(loginDTO): Observable<HttpResponse<any>> {
        const url = Configuration.LOGIN_USER_URL;
        return this.http.post(url, loginDTO, { observe: 'response' });

    }

}