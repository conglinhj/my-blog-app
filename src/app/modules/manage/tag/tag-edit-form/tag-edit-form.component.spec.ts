import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditFormComponent } from './tag-edit-form.component';

describe('TagEditFormComponent', () => {
  let component: TagEditFormComponent;
  let fixture: ComponentFixture<TagEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
