import { ComponentFixture, TestBed } from '@angular/core/testing';

import { developerComponent } from './developer.component';

describe('developerComponent', () => {
  let component: developerComponent;
  let fixture: ComponentFixture<developerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [developerComponent]
    });
    fixture = TestBed.createComponent(developerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
