/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeMainPage } from './home-main.page';

describe('HomeMainPage', () => {
  let component: HomeMainPage;
  let fixture: ComponentFixture<HomeMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMainPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
