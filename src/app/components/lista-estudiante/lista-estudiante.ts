// src/app/components/lista-estudiantes/lista-estudiantes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [CommonModule], // Necesario para *ngFor y *ngIf
  templateUrl: './lista-estudiante.html',
})
export class ListaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    // Es mejor práctica usar un Observable, pero para la práctica, esto es suficiente
    this.cargarEstudiantes();
  }

  // Función para obtener la lista (útil si se actualiza dinámicamente)
  cargarEstudiantes(): void {
    this.estudiantes = this.estudianteService.getEstudiantes();
  }
}