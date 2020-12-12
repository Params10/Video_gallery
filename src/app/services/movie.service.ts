import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from './endPoint.constants';
import {AuthUtils} from 'src/app/utils/authutils';
@Injectable({
    providedIn: 'root'
})

export class MovieService {
   
    constructor(public http: HttpClient, private authUtils: AuthUtils) { }

    movies(token,pagenumber): Observable<HttpResponse<any>> {

        var url = null;
        if(pagenumber == null)
        {
            url = Configuration.MOVIES_URL;
        }
        else{
             url = Configuration.MOVIES_URL+"?page="+pagenumber;
        }
        return this.http.get(url,{ observe: 'response', headers : {Authorization: token}});

    }

    


}