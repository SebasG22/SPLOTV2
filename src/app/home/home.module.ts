import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES } from './pages';
import { HomeRoutingModule } from './home.router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ PAGES ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    SharedModule ],
    exports: [],
    providers: [],
})
export class HomeModule {}
