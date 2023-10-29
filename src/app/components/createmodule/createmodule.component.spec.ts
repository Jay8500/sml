import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemoduleComponent } from './createmodule.component';

describe('CreatemoduleComponent', () => {
  let component: CreatemoduleComponent;
  let fixture: ComponentFixture<CreatemoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemoduleComponent]
    });
    fixture = TestBed.createComponent(CreatemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
