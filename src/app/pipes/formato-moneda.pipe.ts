
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda',
  standalone: true 
})
export class FormatoMonedaPipe implements PipeTransform {
  /**
   * Transforma un valor numérico a formato de moneda (ej: 125.5 a $125,50).
   * @param value El valor numérico a transformar (total de la reserva).
   */
  transform(value: number | null): string {
    if (value === null || isNaN(value)) {
      return '$0,00';
    }

    // Usar toFixed(2) para asegurar dos decimales y luego reemplazar el punto por coma.
    const localFormat = value.toFixed(2).replace('.', ','); 

    return `$${localFormat}`;
  }
}