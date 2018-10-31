import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModelConfigurationPage } from './pages/user-model-configuration/user-model-configuration.page';

const routes: Routes = [
    {
        path: '', children: [
            { path: ':id', component: UserModelConfigurationPage }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationProcessRoutingModule { }
