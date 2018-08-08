import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule
];
@NgModule({
  declarations: [],
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
  providers: []
})
export class SharedModule {}
