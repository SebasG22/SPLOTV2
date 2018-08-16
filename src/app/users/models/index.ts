export interface UserInformation {
    id: string;
    name: string;
    identification?: string;
    email: string;
    photo: string;
    role_id: 'USER_CONFIGURATOR' | 'PROJECT_LEADER' | 'ADMINISTRATOR' [];
    company?: string;
    position?: string;
    telephone?: string;
  }
