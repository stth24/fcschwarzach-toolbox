import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextKmGamesComponent } from './next-km-games.component';

describe('NextKmGamesComponent', () => {
  let component: NextKmGamesComponent;
  let fixture: ComponentFixture<NextKmGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextKmGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextKmGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
