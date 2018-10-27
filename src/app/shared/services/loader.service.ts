import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable()
export class LoaderService {

    private dialogRef;

    constructor(
        private dialog: MatDialog
    ) { }

    public get loader() {
        return this.dialogRef;
    }

    public showLoader(message: string) {
        this.dialogRef = this.dialog.open(LoaderComponent, {
            width: '90%',
            data: {
                message: message,
            }
        });
    }

    public dismissLoader(miliseconds: number = 0) {
        setTimeout(() => {
            this.dialogRef.close();
        }, miliseconds);
    }
}
