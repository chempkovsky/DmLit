
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
  name: 'toBinary' 
})
export class ToBinaryPipe implements PipeTransform {
  private SEPARATOR: string = ' ';
  transform(value: string): string {
    let integer = parseInt((value || '0').toString(), 10);
    return  integer.toString(2).replace(/\B(?=(\d{4})+(?!\d))/g, this.SEPARATOR);
  }
  parse(value: string): string {
    return  parseInt( ((value || '0').toString()).replace(this.SEPARATOR, ''), 10).toString(10);
  }
}

