import { UserInformation } from '../../users/models';
import { FileInformation } from '../../shared/models';

export interface IProject {
    id?: string;
    name: string;
    description: string;
    solutionType: string;
    public: boolean;
    participantsIds: string;
    participants: any;
    created_by?: string;
    created_at?: any;
    update_by?: string;
    updated_at?: any;
}


