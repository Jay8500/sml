import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementComponent } from './disbursement.component';

describe('DisbursementComponent', () => {
  let component: DisbursementComponent;
  let fixture: ComponentFixture<DisbursementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisbursementComponent]
    });
    fixture = TestBed.createComponent(DisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
