import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadermodulemappingComponent } from './cadermodulemapping.component';

describe('CadermodulemappingComponent', () => {
  let component: CadermodulemappingComponent;
  let fixture: ComponentFixture<CadermodulemappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadermodulemappingComponent]
    });
    fixture = TestBed.createComponent(CadermodulemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
