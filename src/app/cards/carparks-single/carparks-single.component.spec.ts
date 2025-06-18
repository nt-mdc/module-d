import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparksSingleComponent } from './carparks-single.component';

describe('CarparksSingleComponent', () => {
  let component: CarparksSingleComponent;
  let fixture: ComponentFixture<CarparksSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarparksSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparksSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
