import { Injectable } from '@angular/core';
// TODO
// Please add All authentication or user related stuff here

@Injectable({
    providedIn: 'root'
})
export class AuthUtils {

    getCurrentUser(): any {
        return localStorage.getItem('userInfo');
    }

    setCurrentUserdata(userInfo: any) {
        var str1 = new String( "Token " ); 
        var str2 = str1.concat(userInfo);
        console.log("str2"+str2);  
        localStorage.setItem('userInfo', str2);
        
    }

    getToken(): any {
        return this.getCurrentUser();
    }

    setLocalStorage(key: any, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key: any) {
        let value = localStorage && localStorage.getItem(key);
        if (value != null && value !== 'undefined') {
          value = JSON.parse(value);
        }
        return value;
    }
}