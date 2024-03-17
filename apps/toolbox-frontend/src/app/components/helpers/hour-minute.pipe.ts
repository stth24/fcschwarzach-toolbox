import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hourMinute'
})
export class HourMinutePipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        return (value.length < 2 ? '0' : '') + value;
    }

}
