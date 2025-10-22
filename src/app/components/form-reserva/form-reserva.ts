import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Reserva, ReservaService } from '../../services/reserva';

@Component({
  selector: 'app-form-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './form-reserva.html',
})
export class FormReservaComponent implements OnInit {
  reservaForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      // Cliente: requerido, mínimo 3 caracteres
      cliente: ['', [Validators.required, Validators.minLength(3)]], 
      
      // Habitación: requerida
      habitacion: ['', Validators.required], 

      // Grupo de Fechas: Aplicación de validación cruzada
      fechas: this.fb.group({
        fechaEntrada: ['', [Validators.required]],
        fechaSalida: ['', [Validators.required]],
      }, { validators: dateValidator() }), // <-- ¡Validación cruzada aquí!

      // Total: requerido, mayor a 0, con patrón para decimales
      total: [
        null, 
        [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      ], 
    });
  }

  // Getter para los controles del formulario principal
  get f() {
    return this.reservaForm.controls;
  }
  
  // Getter para el grupo de fechas (necesario para mostrar su error cruzado)
  get fechasGroup() {
    return this.reservaForm.get('fechas') as FormGroup;
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched(); // Muestra errores en todos los campos
      return;
    }

    const formValue = this.reservaForm.value;

    const nuevaReserva: Omit<Reserva, 'id'> = {
      cliente: formValue.cliente,
      habitacion: Number(formValue.habitacion), 
      fechaEntrada: new Date(formValue.fechas.fechaEntrada),
      fechaSalida: new Date(formValue.fechas.fechaSalida),
      total: Number(formValue.total),
    };

    this.reservaService.addReserva(nuevaReserva);
    this.router.navigate(['/reservas']); 
  }
}

function dateValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fechaEntrada = group.get('fechaEntrada')?.value;
    const fechaSalida = group.get('fechaSalida')?.value;

    if (!fechaEntrada || !fechaSalida) {
      return null; 
    }

    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    if (salida.getTime() <= entrada.getTime()) {
      return { 'fechaInvalida': true }; // Error de validación cruzada
    }
    return null;
  };
}