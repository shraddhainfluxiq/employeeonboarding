import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaderComponent } from './theader.component';

describe('TheaderComponent', () => {
  let component: TheaderComponent;
  let fixture: ComponentFixture<TheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
