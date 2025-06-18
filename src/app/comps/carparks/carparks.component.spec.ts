import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparksComponent } from './carparks.component';

describe('CarparksComponent', () => {
  let component: CarparksComponent;
  let fixture: ComponentFixture<CarparksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarparksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
