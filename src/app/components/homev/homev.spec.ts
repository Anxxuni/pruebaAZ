import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homev } from './homev';

describe('Homev', () => {
  let component: Homev;
  let fixture: ComponentFixture<Homev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homev);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
