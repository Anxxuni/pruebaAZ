import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

export const routes: Routes = [
    
{path: '', pathMatch: 'full',component: Navbar},
{path: '', pathMatch: 'full',redirectTo: 'home'} 
];
