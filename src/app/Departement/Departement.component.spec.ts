/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartementComponent } from './Departement.component';

describe('DepartementComponent', () => {
  let component: DepartementComponent;
  let fixture: ComponentFixture<DepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
