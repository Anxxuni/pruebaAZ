
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Reserva {
  id: number;
  cliente: string;
  habitacion: number;
  fechaEntrada: Date;
  fechaSalida: Date;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
 // Lista inicial de reservas mock
  private reservasIniciales: Reserva[] = [
    {
      id: 1,
      cliente: 'Marco Montoya',
      habitacion: 101,
      fechaEntrada: new Date(2025, 10, 15), // Nov 15
      fechaSalida: new Date(2025, 10, 20),  // Nov 20
      total: 450.75
    },
    {
      id: 2,
      cliente: 'Luis Pérez',
      habitacion: 203,
      fechaEntrada: new Date(2025, 11, 1), // Dec 01
      fechaSalida: new Date(2025, 11, 5),  // Dec 05
      total: 325.00
    },
    {
      id: 3,
      cliente: 'Maria Solano',
      habitacion: 305,
      fechaEntrada: new Date(2026, 0, 10), // Jan 10
      fechaSalida: new Date(2026, 0, 12),  // Jan 12
      total: 180.50
    }
  ];

  // BehaviorSubject para mantener la lista y emitir cambios
  private _reservas$ = new BehaviorSubject<Reserva[]>(this.reservasIniciales);

  // Observable público para que los componentes se suscriban
  public reservas$: Observable<Reserva[]> = this._reservas$.asObservable();

  constructor() { }

  /** Obtiene la lista actual de reservas (Observable) */
  getReservas(): Observable<Reserva[]> {
    return this.reservas$;
  }

  /** Agrega una nueva reserva y actualiza el BehaviorSubject */
  addReserva(nuevaReserva: Omit<Reserva, 'id'>): void {
    const currentReservas = this._reservas$.getValue();
    const newId = currentReservas.length > 0 ? Math.max(...currentReservas.map(r => r.id)) + 1 : 1;

    const reservaCompleta: Reserva = {
      ...nuevaReserva,
      id: newId
    };

    const updatedReservas = [...currentReservas, reservaCompleta];
    this._reservas$.next(updatedReservas); // Emite la nueva lista
  }
}