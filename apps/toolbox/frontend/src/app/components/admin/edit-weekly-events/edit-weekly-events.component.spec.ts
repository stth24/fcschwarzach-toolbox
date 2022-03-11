import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeeklyEventsComponent } from './edit-weekly-events.component';

describe('EditWeeklyEventsComponent', () => {
  let component: EditWeeklyEventsComponent;
  let fixture: ComponentFixture<EditWeeklyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeeklyEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeeklyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
