import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Homev } from './components/homev/homev';

export const routes: Routes = [
    
{path: 'navbar',component: Navbar},
{path: 'home',component: Homev},
{path: '', pathMatch: 'full',redirectTo: 'home'} 
];
