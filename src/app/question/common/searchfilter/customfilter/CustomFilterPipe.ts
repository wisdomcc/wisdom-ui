import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class CustomFilterPipe implements PipeTransform {
    transform(subjects: any[], filter: any): any {
        if (!subjects || !filter) {
            return subjects;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return subjects.filter(subject => subject.toLowerCase().match(filter.toLowerCase()));
    }
}