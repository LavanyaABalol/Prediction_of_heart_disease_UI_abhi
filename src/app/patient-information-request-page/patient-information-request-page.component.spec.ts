import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInformationRequestPageComponent } from './patient-information-request-page.component';

describe('PatientInformationRequestPageComponent', () => {
  let component: PatientInformationRequestPageComponent;
  let fixture: ComponentFixture<PatientInformationRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInformationRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInformationRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
