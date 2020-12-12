import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class StaticVariables {


    static MESSAGE_DURATION_CONSTANT = 5000;
    static OK_CONSTANT = 'OK';
    static SUCCESS_CONSTANT = 'SUCCESS';
    static FAILURE_CONSTANT = 'FAILURE';
    static PRECONDITION_FAILED = 'PRECONDITION_FAILED';
    static VALID_CONSTANT = 'VALID';

    static VALIDATION_REQUIRED_TRUE_PAYLOAD = [Validators.required];
}
