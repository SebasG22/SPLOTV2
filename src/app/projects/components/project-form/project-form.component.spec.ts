/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProjectFormComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should build the project form', () => {
    spyOn(component, 'buildForm').and.callThrough();
    fixture.detectChanges();
    expect(component.buildForm).toHaveBeenCalled();
    expect(component.form).toBeDefined();
  });

});
