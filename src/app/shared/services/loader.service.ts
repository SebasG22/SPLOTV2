import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoaderComponent } from '../components/loader/loader.component';
import { Store } from '@ngrx/store';
import { OnGoToPageSplot } from '../actions/router.actions';

@Injectable()
export class LoaderService {

    private dialogRef;

    constructor(
        private dialog: MatDialog,
        private store: Store<{}>
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

    public dismissLoader(miliseconds: number = 0, page?: any) {
        setTimeout(() => {
            this.dialogRef.close();
            if (page) {
                this.store.dispatch(new OnGoToPageSplot({ path: page }));
            }
        }, miliseconds);
    }
}
