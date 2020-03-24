import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskShareComponent } from './task-share.component';

describe('TaskShareComponent', () => {
  let component: TaskShareComponent;
  let fixture: ComponentFixture<TaskShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
