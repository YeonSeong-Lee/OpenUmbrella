import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtComponent } from './jwt.component';

describe('JwtComponent', () => {
  let component: JwtComponent;
  let fixture: ComponentFixture<JwtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JwtComponent]
    });
    fixture = TestBed.createComponent(JwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
