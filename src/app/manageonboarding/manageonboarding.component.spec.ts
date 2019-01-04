import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageonboardingComponent } from './manageonboarding.component';

describe('ManageonboardingComponent', () => {
  let component: ManageonboardingComponent;
  let fixture: ComponentFixture<ManageonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
