import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlessoncategoryComponent } from './addlessoncategory.component';

describe('AddlessoncategoryComponent', () => {
  let component: AddlessoncategoryComponent;
  let fixture: ComponentFixture<AddlessoncategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlessoncategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlessoncategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
