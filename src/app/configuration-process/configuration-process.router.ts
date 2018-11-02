import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModelConfigurationPage } from './pages/user-model-configuration/user-model-configuration.page';
import { ConfigurationInformationPage } from './pages/configuration-information/configuration-information.page';

const routes: Routes = [
    {
        path: 'configuration-process', children: [
            { path: ':id/information', component: ConfigurationInformationPage },
            { path: ':id/configuration', component: UserModelConfigurationPage }

        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationProcessRoutingModule { }
