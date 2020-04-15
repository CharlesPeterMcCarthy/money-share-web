import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  public transform(datetime: string | Date, args?: any[]): any {
    const dt = new Date(datetime);
    const duration = moment.duration(moment(new Date()).diff(moment(dt)));
    const days = Math.floor(duration.asDays());
    const hours = Math.floor((duration.asMinutes() - (days * 24 * 60)) / 60);
    const minutes = Math.floor(duration.asMinutes()) - (days * 24 * 60) - (hours * 60);

    if (days) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    return `Just now`;;
  }

}
