import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategenderComponent } from './creategender.component';

describe('CreategenderComponent', () => {
  let component: CreategenderComponent;
  let fixture: ComponentFixture<CreategenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreategenderComponent]
    });
    fixture = TestBed.createComponent(CreategenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
