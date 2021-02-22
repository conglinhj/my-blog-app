import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryEditFormComponent } from './category-edit-form.component';

describe('CategoryEditFormComponent', () => {
  let component: CategoryEditFormComponent;
  let fixture: ComponentFixture<CategoryEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
