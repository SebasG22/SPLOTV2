/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserInformationPage } from './user-information.page';

describe('UserInformationPage', () => {
  let component: UserInformationPage;
  let fixture: ComponentFixture<UserInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
