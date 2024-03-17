import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTilesComponent } from './game-tiles.component';

describe('GameTilesComponent', () => {
  let component: GameTilesComponent;
  let fixture: ComponentFixture<GameTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
