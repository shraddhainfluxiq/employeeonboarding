import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlessoncatComponent } from './addlessoncat.component';

describe('AddlessoncatComponent', () => {
  let component: AddlessoncatComponent;
  let fixture: ComponentFixture<AddlessoncatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlessoncatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlessoncatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
