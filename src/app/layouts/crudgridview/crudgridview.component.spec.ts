import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudgridviewComponent } from './crudgridview.component';

describe('CrudgridviewComponent', () => {
  let component: CrudgridviewComponent;
  let fixture: ComponentFixture<CrudgridviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudgridviewComponent]
    });
    fixture = TestBed.createComponent(CrudgridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
