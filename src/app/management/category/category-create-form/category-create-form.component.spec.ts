import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryCreateFormComponent } from './category-create-form.component';

describe('CategoryCreateFormComponent', () => {
  let component: CategoryCreateFormComponent;
  let fixture: ComponentFixture<CategoryCreateFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
