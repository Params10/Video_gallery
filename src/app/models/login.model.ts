export class Login {
    
    is_success:boolean;
    data:indata;
    error:errormessages;
   
}

export class indata {
   
    token:string;

}
export class errormessages{


    message: string;
    code: string;
}

export class loginDTO{
    username:string;
    password:string;
}
