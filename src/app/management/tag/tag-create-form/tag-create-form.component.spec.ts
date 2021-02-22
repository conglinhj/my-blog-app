import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagCreateFormComponent } from './tag-create-form.component';

describe('TagCreateFormComponent', () => {
  let component: TagCreateFormComponent;
  let fixture: ComponentFixture<TagCreateFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
