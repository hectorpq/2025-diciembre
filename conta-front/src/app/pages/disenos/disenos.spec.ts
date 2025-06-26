import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Disenos } from './disenos';

describe('Disenos', () => {
  let component: Disenos;
  let fixture: ComponentFixture<Disenos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Disenos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Disenos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
