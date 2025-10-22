
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda',
  standalone: true 
})export class FormatoMonedaPipe implements PipeTransform {
  /**
   * Transforma un valor numérico a formato de moneda.
   */
  transform(value: number | null): string {
    if (value === null || isNaN(value)) {
      return '$0,00';
    }
    
    // 1. Convertir a string con dos decimales
    let s = value.toFixed(2);
    
    // 2. Reemplazar punto por coma
    s = s.replace('.', ',');
    
    // 3. Devolver con símbolo
    return '$' + s;
  }
}