import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnrtitleComponent } from './hnrtitle.component';

describe('HnrtitleComponent', () => {
  let component: HnrtitleComponent;
  let fixture: ComponentFixture<HnrtitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HnrtitleComponent]
    });
    fixture = TestBed.createComponent(HnrtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
