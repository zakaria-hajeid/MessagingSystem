/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrgnizationUserComponent } from './OrgnizationUser.component';

describe('OrgnizationUserComponent', () => {
  let component: OrgnizationUserComponent;
  let fixture: ComponentFixture<OrgnizationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgnizationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgnizationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
