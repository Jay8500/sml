import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmldashboardComponent } from './smldashboard.component';

describe('SmldashboardComponent', () => {
  let component: SmldashboardComponent;
  let fixture: ComponentFixture<SmldashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmldashboardComponent]
    });
    fixture = TestBed.createComponent(SmldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
