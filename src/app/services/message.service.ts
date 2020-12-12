import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef
} from '@angular/material';
import { StaticVariables } from '../utils/staticvariables';

@Injectable({
  providedIn: 'root'
})

// TO-DO This Service has been created to display the messages like Success Message, Error Message
export class MessageService {
  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarAutoHide = StaticVariables.MESSAGE_DURATION_CONSTANT;

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Success message
   * @param message
   */
  successMessage(message: string) {
    window.scroll(0, 0 );
    this.getBasicConfig();
    this.snackBarConfig.panelClass = ['success-message', 'mt-70'];
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
  }

  /**
   * Errors message
   * @param message
   */
  errorMessage(message: string) {
    window.scroll(0, 0 );
    this.getBasicConfig();
    this.snackBarConfig.panelClass = ['error-message', 'mt-70'];
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
  }

  errorsMessage(messageArray: any) {
    window.scroll(0, 0 );
    this.getBasicConfig();
    this.snackBarConfig.panelClass = ['error-message', 'mt-70'];
    const errorMes: string[] = [];
    messageArray.forEach((item, index) => {
      errorMes.push(item.errorMessage);
    });
    const message = errorMes.join(' and ');
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
  }

  getBasicConfig() {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = this.snackBarAutoHide;
  }

}
