import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Configuration {

    static LOGIN_USER_URL ='https://demo.credy.in/api/v1/usermodule/login/';

    static MOVIES_URL ='https://demo.credy.in/api/v1/maya/movies/';


}