import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreateFormComponent } from './tag-create-form.component';

describe('TagCreateFormComponent', () => {
  let component: TagCreateFormComponent;
  let fixture: ComponentFixture<TagCreateFormComponent>;

  beforeEach(async(() => {
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
