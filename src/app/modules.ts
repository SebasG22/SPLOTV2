import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ConfigurationProcessModule } from './configuration-process/configuration-process.module';

export const MODULES = [
    AuthModule,
    SharedModule,
    ConfigurationProcessModule
];
