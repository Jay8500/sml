import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgpwdComponent } from './fgpwd.component';

describe('FgpwdComponent', () => {
  let component: FgpwdComponent;
  let fixture: ComponentFixture<FgpwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FgpwdComponent]
    });
    fixture = TestBed.createComponent(FgpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
