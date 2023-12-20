import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverypostsComponent } from './recoveryposts.component';

describe('RecoverypostsComponent', () => {
  let component: RecoverypostsComponent;
  let fixture: ComponentFixture<RecoverypostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverypostsComponent]
    });
    fixture = TestBed.createComponent(RecoverypostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
