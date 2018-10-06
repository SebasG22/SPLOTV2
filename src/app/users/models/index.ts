export interface UserInformation {
  id: string;
  photo: string;
  name: string;
  identification?: string;
  email: string;
  telephone?: string;
  permissions: UserPermissionsConfig[];
  company?: string;
  position?: string;
}

export interface AppPermissions {
  id: string;
  name: string;
}
export interface UserPermissionsConfig {
  id: string;
  name: string;
  enabled: boolean;
}


  // 'USER_CONFIGURATOR' | 'PROJECT_LEADER' | 'ADMINISTRATOR'
