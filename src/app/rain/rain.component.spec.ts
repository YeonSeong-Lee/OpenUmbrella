import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainComponent } from './rain.component';

describe('RainComponent', () => {
  let component: RainComponent;
  let fixture: ComponentFixture<RainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainComponent],
    });
    fixture = TestBed.createComponent(RainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
