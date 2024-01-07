import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateborrowersComponent } from './createborrowers.component';

describe('CreateborrowersComponent', () => {
  let component: CreateborrowersComponent;
  let fixture: ComponentFixture<CreateborrowersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateborrowersComponent]
    });
    fixture = TestBed.createComponent(CreateborrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
