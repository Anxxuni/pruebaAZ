import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { FormEstudianteComponent } from './components/form-estudiante/form-estudiante';
import { ListaEstudiantesComponent } from './components/lista-estudiante/lista-estudiante';

export const routes: Routes = [
    
{path: 'navbar',component: Navbar},
 { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: ListaEstudiantesComponent },
  { path: 'nuevo', component: FormEstudianteComponent },
  { path: '**', redirectTo: 'estudiantes' }
];
