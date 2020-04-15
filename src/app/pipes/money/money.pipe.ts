import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  public transform(cent: number): string {
    return `€${(cent / 100).toFixed(2)}`;
  }

}
