/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PermationsComponent } from './Permations.component';

describe('PermationsComponent', () => {
  let component: PermationsComponent;
  let fixture: ComponentFixture<PermationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
