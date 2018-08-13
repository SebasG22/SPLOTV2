import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule
} from '@angular/material';
import { COMPONENTS } from './components';
import { RouterModule } from '@angular/router';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule
];
@NgModule({
  declarations: [ COMPONENTS ],
  imports: [MATERIAL_MODULES, RouterModule],
  exports: [MATERIAL_MODULES, COMPONENTS],
  providers: []
})
export class SharedModule {}
