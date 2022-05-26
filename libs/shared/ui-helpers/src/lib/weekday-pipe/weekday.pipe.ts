import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

    transform(value: Date): string {
        switch (value.getDay()) {
            case 1:
                return "Montag";
            case 2:
                return "Dienstag";
            case 3:
                return "Mittwoch";
            case 4:
                return "Donnerstag";
            case 5:
                return "Freitag";
            case 6:
                return "Samstag";
            case 0:
                return "Sonntag";
            default:
                return "";
        }
    }

}
