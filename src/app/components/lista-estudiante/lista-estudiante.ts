import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './lista-estudiante.html',
})
export class ListaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudiantes = this.estudianteService.getEstudiantes();
  }
}