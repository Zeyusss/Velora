import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonLayoutComponent } from './anon-layout.component';

describe('AnonLayoutComponent', () => {
  let component: AnonLayoutComponent;
  let fixture: ComponentFixture<AnonLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
