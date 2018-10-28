import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorSplotPage } from './pages/error/error-splot.page';

const routes: Routes = [
    {
        path: 'error', children:
            [
                { path: '', component: ErrorSplotPage }
            ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ErrorSplotRoutingModule { }
