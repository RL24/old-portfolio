import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaladinsComponent } from './paladins.component';

describe('PaladinsComponent', () => {
  let component: PaladinsComponent;
  let fixture: ComponentFixture<PaladinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaladinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaladinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
