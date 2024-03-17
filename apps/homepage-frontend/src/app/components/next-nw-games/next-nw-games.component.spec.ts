import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextNwGamesComponent } from './next-nw-games.component';

describe('NextNwGamesComponent', () => {
  let component: NextNwGamesComponent;
  let fixture: ComponentFixture<NextNwGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextNwGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextNwGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
