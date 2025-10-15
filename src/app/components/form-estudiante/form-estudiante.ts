// src/app/components/form-estudiante/form-estudiante.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante';

@Component({
  selector: 'app-form-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './form-estudiante.html',
})
export class FormEstudianteComponent implements OnInit {
  estudianteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      carrera: ['', Validators.required],
      promedio: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  // Getter para un acceso más fácil en la plantilla
  get form() {
    return this.estudianteForm.controls;
  }

  onSubmit(): void {
    if (this.estudianteForm.valid) {
      // Omit<'id'> ya que el id lo asigna el servicio
      this.estudianteService.agregarEstudiante(this.estudianteForm.value);
      this.router.navigate(['/estudiantes']); // Redirigir a la lista
    }
  }
}