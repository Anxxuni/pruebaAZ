
import { Injectable } from '@angular/core';

export interface Estudiante {
  id: number;
  nombre: string;
  carrera: string;
  promedio: number;
} ///Hola

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private estudiantes: Estudiante[] = [
    { id: 1, nombre: 'Marco Montoya', carrera: 'Ingeniería de Software', promedio: 9.2 },
    { id: 2, nombre: 'Luis Pérez', carrera: 'Diseño Gráfico', promedio: 7.5 },
    { id: 3, nombre: 'Maria Solano', carrera: 'Administración de Empresas', promedio: 8.8 },
  ];
  private nextId = 4; // Para  IDs únicos

  constructor() { }

  // Retorna la lista actual de estudiantes
  getEstudiantes(): Estudiante[] {
    return this.estudiantes;
  }

  // Agrega un nuevo estudiante a la lista
  agregarEstudiante(nuevoEstudiante: Omit<Estudiante, 'id'>): void {
    const estudianteConId: Estudiante = {
      ...nuevoEstudiante,
      id: this.nextId++
    };
    this.estudiantes.push(estudianteConId);
    console.log('Estudiante agregado:', estudianteConId);
  }
}