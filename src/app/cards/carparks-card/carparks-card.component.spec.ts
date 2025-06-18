import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparksCardComponent } from './carparks-card.component';

describe('CarparksCardComponent', () => {
  let component: CarparksCardComponent;
  let fixture: ComponentFixture<CarparksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarparksCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
