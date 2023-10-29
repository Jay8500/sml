import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcodeComponent } from './empcode.component';

describe('EmpcodeComponent', () => {
  let component: EmpcodeComponent;
  let fixture: ComponentFixture<EmpcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpcodeComponent]
    });
    fixture = TestBed.createComponent(EmpcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
