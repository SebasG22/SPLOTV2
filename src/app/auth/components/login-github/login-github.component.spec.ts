/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginGithubComponent } from './login-github.component';

describe('LoginGithubComponent', () => {
  let component: LoginGithubComponent;
  let fixture: ComponentFixture<LoginGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
