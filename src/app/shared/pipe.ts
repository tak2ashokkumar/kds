import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'SecToDays'
})
export class AppSecToDaysPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const date = new Date(0, 0, 0, 0, 0, value);
            const days = Math.floor((value / 3600) / 24);
            const hours = date.getHours() + 'h ' + date.getMinutes() + 'm ' + date.getSeconds() + 's';
            return days > 0 ? days + 'days, ' + hours : hours;
        } else {
            return 'N/A';
        }
    }

}

@Pipe({
    name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
    private units: string[] = [
        'bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB'
    ];

    transform(value: any, args?: any): any {
        let result: string;
        if (isNaN(parseFloat(String(value))) || !isFinite(value)) {
            result = '?';
        } else {
            let unit = 0;

            while (value >= 1024) {
                value /= 1024;
                unit++;
            }

            result = value.toFixed(2) + ' ' + this.units[unit];
        }
        return result;
    }
}
