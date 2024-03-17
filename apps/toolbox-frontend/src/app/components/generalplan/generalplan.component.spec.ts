import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralplanComponent } from './generalplan.component';

describe('GeneralplanComponent', () => {
  let component: GeneralplanComponent;
  let fixture: ComponentFixture<GeneralplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
