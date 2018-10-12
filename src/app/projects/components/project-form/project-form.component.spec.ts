/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as projectReducer from '../reducers/projects.reducer';
import { UpdateProject, CreateProject } from '../actions/projects.action';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mocks
const SIMPLE_PROJECT = {
    'id': '',
    'name': 'foo',
    'description': 'bar',
    'state': '',
    'public': true,
    'participantsIds': ['userId'],
    'files': 'none'
};

describe('ProjectFormComponent', () => {
    let component: ProjectFormComponent;
    let fixture: ComponentFixture<ProjectFormComponent>;
    let store: Store<any>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                SharedModule,
                ReactiveFormsModule,
                StoreModule.forRoot(
                    {
                        projectFeatureModel: combineReducers({ project: projectReducer.reducer })
                    }
                )
            ],
            declarations: [ProjectFormComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;

        store = TestBed.get(Store);

        // spyes
        spyOn(store, 'dispatch').and.callThrough();
        spyOn(store, 'select').and.callThrough();

    }));



    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should build the project form', () => {
        spyOn(component, 'buildForm').and.callThrough();
        fixture.detectChanges();
        expect(component.buildForm).toHaveBeenCalled();
        expect(component.form).toBeDefined();
    });

    it('the project form must be on the screen', () => {
        fixture.detectChanges();
        const html = fixture.debugElement;
        const panelProjectForm = html.query(By.css('.panel-project-form'));
        expect(panelProjectForm.nativeElement).toBeTruthy();
    });

    it('On create mode, the form must not show identification', () => {
        component.mode = 'create';
        fixture.detectChanges();
        const html = fixture.debugElement;
        const panelProjectForm = html.query(By.css('.panel-project-form'));
        const identificationControl = panelProjectForm.query(By.css('input[formControlName="id"]'));
        expect(identificationControl).toBeNull();
    });

    it('On edit mode, the form must show identification but disabled', () => {
        component.mode = 'edit';
        fixture.detectChanges();
        const html = fixture.debugElement;
        const panelProjectForm = html.query(By.css('.panel-project-form'));
        const identificationControl = panelProjectForm.query(By.css('input[formControlName="id"]:disabled'));
        expect(identificationControl.nativeElement).toBeTruthy();
    });

    fit('When submit the form on create mode, must create the project', () => {
        spyOn(component, 'onSubmitForm').and.callThrough();
        component.mode = 'edit';
        fixture.detectChanges();
        component.form.patchValue({
            ...SIMPLE_PROJECT,
            id: null
        });
        const html = fixture.debugElement;
        const submitButton = html.query(By.css('button[type="submit"]'));
        submitButton.nativeElement.click();
        expect(component.onSubmitForm).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new CreateProject(component.form.value));
    });

    // fit('When submit the form on edit mode, must update the project', () => {
    //     spyOn(component, 'onSubmitForm').and.callThrough();
    //     component.mode = 'edit';
    //     fixture.detectChanges();
    //     component.form.patchValue({
    //         ...SIMPLE_PROJECT
    //     });
    //     const html = fixture.debugElement;
    //     const submitButton = html.query(By.css('button[type="submit"]'));
    //     submitButton.nativeElement.click();
    //     expect(component.onSubmitForm).toHaveBeenCalled();
    //     expect(store.dispatch).toHaveBeenCalledWith(new UpdateProject(component.form.value));
    // });



});
