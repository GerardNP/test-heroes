import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private timeDurationMiliSeconds: number = 3000;

    constructor(
        private _snackBar: MatSnackBar,
    ) { }

    show(message: string, messageButton?: string, hasDuration?: boolean): void {
        this._snackBar.open(message, messageButton ?? 'Cerrar', {
            duration: hasDuration ? this.timeDurationMiliSeconds : undefined
        });
    }
}
