import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStamp'
})
export class TimeStampPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
