import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiante } from './lista-estudiante';

describe('ListaEstudiante', () => {
  let component: ListaEstudiante;
  let fixture: ComponentFixture<ListaEstudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEstudiante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEstudiante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
