import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroManagamentComponent } from './hero-managament.component';

describe('HeroManagamentComponent', () => {
  let component: HeroManagamentComponent;
  let fixture: ComponentFixture<HeroManagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroManagamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
