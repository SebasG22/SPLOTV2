import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateProject, CreateProject } from '../actions/projects.action';
import { MatDialog } from '@angular/material';
import { SearchUsersComponent } from '../../../users/components/search-users/search-users.component';
import { get, forEach } from 'lodash';
import { GetUsersInformationByIds } from '../../../users/actions/users.actions';
import { UserInformation } from '../../../users/models';
import { Observable } from 'rxjs';
import { getUsersList, getUsersLoadingData } from '../../../users/reducers/users.reducer';
import { Location } from '@angular/common';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    public form: FormGroup;

    public participantsInformation$: Observable<UserInformation[]>;

    public loadingData$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private store: Store<{}>,
        private dialog: MatDialog
    ) { }

    @Input() mode: 'create' | 'edit';

    ngOnInit() {
        this.buildForm();
        this.listenUserList();
    }

    public buildForm() {
        this.form = this.fb.group({
            'id': [''],
            'name': ['', Validators.required],
            'description': ['', Validators.required],
            'state': [''],
            'public': [true],
            'participantsIds': ['', Validators.required],
            'files': ['']
        });
        this.form.get('id').disable({ onlySelf: true });
    }

    public openUsersSearchModal() {
        const modal = this.dialog.open(SearchUsersComponent, {
            width: '95%',
            data: {
                placeholder: 'Search Users'
            }
        });

        modal.afterClosed().subscribe((data) => {
            if (data) {
                const usersIds = [];
                forEach(get(data, 'selected', []), item => {
                    usersIds.push(get(item, 'id', ''));
                });
                this.form.patchValue({
                    participantsIds: usersIds.join()
                });
                this.getParticipantsInformation(usersIds);
            }
        }
        );
    }

    public listenLoadingData() {
        this.loadingData$ = this.store.select(getUsersLoadingData);
    }

    /**
     * @description listen the pariticipants information changes
     * @author Sebastián Guevara
     */
    public listenUserList() {
        this.participantsInformation$ = this.store.select(getUsersList);
    }

    public getParticipantsInformation(usersIds: string[]) {
        this.store.dispatch(new GetUsersInformationByIds(usersIds));
    }

    public getParticipantsName(usersInformation: UserInformation[]) {
        const usersIds = [];
        forEach(usersInformation, item => {
            usersIds.push(get(item, 'name', ''));
        });
        return usersIds;
    }

    public onSubmitForm({ valid, value }: { valid: boolean, value: any }) {
        console.log({ valid, value });
        if (valid) {
            switch (this.mode) {
                case 'create':
                    return this.store.dispatch(new CreateProject(value));
                case 'edit':
                    return this.store.dispatch(new UpdateProject(value));
            }
        }
    }

    public goBack() {

    }

}
