import { NgModule } from '@angular/core';
import {MatToolbarModule , MatCardModule,  MatButtonModule} from '@angular/material/';

const MATERIAL_MODULES = [MatToolbarModule, MatCardModule , MatButtonModule];
@NgModule({
    declarations: [],
    imports: [MATERIAL_MODULES],
    exports: [MATERIAL_MODULES],
    providers: [],
})
export class SharedModule {}
