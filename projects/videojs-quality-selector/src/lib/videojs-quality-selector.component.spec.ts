import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideojsQualitySelectorComponent } from './videojs-quality-selector.component';

describe('VideojsQualitySelectorComponent', () => {
  let component: VideojsQualitySelectorComponent;
  let fixture: ComponentFixture<VideojsQualitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideojsQualitySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideojsQualitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
