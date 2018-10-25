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
  MatRadioModule,
  MatTableModule
} from '@angular/material';
import { COMPONENTS } from './components';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { StoreModule } from '@ngrx/store';

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
  MatTableModule
];
@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    RouterModule,
    StoreModule.forFeature('SharedFeatureModel', {}),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [
    MATERIAL_MODULES,
    COMPONENTS
  ],
  providers: []
})
export class SharedModule { }
