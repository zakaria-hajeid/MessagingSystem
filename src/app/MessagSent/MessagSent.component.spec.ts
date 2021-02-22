/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessagSentComponent } from './MessagSent.component';

describe('MessagSentComponent', () => {
  let component: MessagSentComponent;
  let fixture: ComponentFixture<MessagSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
