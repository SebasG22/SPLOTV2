import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { COMPONENTS } from './components';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatCheckboxModule,
];
@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    RouterModule],
  exports: [
    MATERIAL_MODULES,
    COMPONENTS
  ],
  providers: []
})
export class SharedModule { }
