import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { UserRoutingModule } from './users.router';
import { reducers } from './reducers/users.reducer';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchUsersComponent } from './components/search-users/search-users.component';

@NgModule({
    declarations: [
        COMPONENTS,
        PAGES
    ],
    imports: [CommonModule,
        SharedModule,
        ReactiveFormsModule,
        UserRoutingModule,
        StoreModule.forFeature('UserFeatureModel', reducers),
        EffectsModule.forFeature(EFFECTS)
    ],
    entryComponents: [
        SearchUsersComponent
    ],
    exports: [COMPONENTS],
    providers: [
        UserService
    ],
})
export class UsersModule { }
