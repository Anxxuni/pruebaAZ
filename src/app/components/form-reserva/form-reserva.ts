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
  minDate: string = ''; // Propiedad para la fecha mínima en el HTML

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router
  ) {
    // Inicializa minDate con la fecha de hoy en formato YYYY-MM-DD
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      habitacion: ['', Validators.required],
      fechas: this.fb.group({
        fechaEntrada: ['', [Validators.required]],
        fechaSalida: ['', [Validators.required]],
      }, { validators: dateValidator() }), 

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

  // Getter para el grupo de fechas 
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
    const fechaEntradaControl = group.get('fechaEntrada');
    const fechaSalidaControl = group.get('fechaSalida');

    const fechaEntrada = fechaEntradaControl?.value;
    const fechaSalida = fechaSalidaControl?.value;

    if (!fechaEntrada || !fechaSalida) {
      return null;
    }
    const partesEntrada = fechaEntrada.split('-').map(Number);
    const entrada = new Date(partesEntrada[0], partesEntrada[1] - 1, partesEntrada[2]);

    const partesSalida = fechaSalida.split('-').map(Number);
    const salida = new Date(partesSalida[0], partesSalida[1] - 1, partesSalida[2]);

    if (salida.getTime() <= entrada.getTime()) {
      return { 'fechaInvalida': true }; 
    }

    const today = new Date();

    const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (entrada.getTime() < localToday.getTime()) {
      return { 'fechaPasada': true }; 
    }

    return null;
  };
}