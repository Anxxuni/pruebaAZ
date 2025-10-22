import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva, ReservaService } from '../../services/reserva';
import { Observable } from 'rxjs';
import { FormatoMonedaPipe } from '../../pipes/formato-moneda.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-reserva',
  standalone: true,
  imports: [CommonModule, FormatoMonedaPipe, RouterLink], 
  templateUrl: './lista-reserva.html',
})
export class ListaReservaComponent implements OnInit {
 reservas$!: Observable<Reserva[]>; 

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservas$ = this.reservaService.getReservas(); 
  }
}