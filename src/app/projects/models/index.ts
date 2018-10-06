import { UserInformation } from '../../users/models';
import { FileInformation } from '../../shared/models';

export interface Project {
    id?: string;
    name: string;
    description: string;
    state: string;
    public: boolean;
    participants: UserInformation[];
    files: FileInformation[];
    created_by?: string;
    created_at?: any;
    update_by?: string;
    updated_at?: any;
}
