import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ListaReservaComponent } from './components/lista-reserva/lista-reserva';
import { FormReservaComponent } from './components/form-reserva/form-reserva';

export const routes: Routes = [
    
  {path: 'navbar',component: Navbar},
  { path: '', redirectTo: 'reservas', pathMatch: 'full' },
  { path: 'reservas', component: ListaReservaComponent },
  { path: 'nuevo', component: FormReservaComponent },
  { path: '**', redirectTo: 'reservas' }
];
