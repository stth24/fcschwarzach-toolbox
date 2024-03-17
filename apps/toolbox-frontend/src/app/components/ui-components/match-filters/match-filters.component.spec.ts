import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFiltersComponent } from './match-filters.component';

describe('MatchFiltersComponent', () => {
  let component: MatchFiltersComponent;
  let fixture: ComponentFixture<MatchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
