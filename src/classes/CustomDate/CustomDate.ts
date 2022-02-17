import {DateInfo, Day, Time, TimeInfo} from "./CustomDate.types";

export class CustomDate {
    date: Date;

    constructor(timestamp: number | string) {
        this.date = new Date(+timestamp)
    }

    private parseDateInfo(): Day {
        const [dayOfWeek, ...dateStringArr] = this.date.toDateString().split(' ');
        const [month, day, year] = dateStringArr;
        const dateString = dateStringArr.join(' ');

        return {
            month,
            day,
            year,
            dayOfWeek,
            dateString
        };
    }

    private static formatTime(timestring: string): Time {
        const regexStr = /:|\s/;
        const [
            initalHour,
            minutes,
            seconds,
            AMOrPM
        ] = timestring.split(regexStr);

        let hour;

        if (AMOrPM === 'AM'){
            hour = initalHour !== '12' ? initalHour : '0';
        } else {
            hour = initalHour === '12' ? initalHour : `${parseInt(initalHour) + 12}`;
        }

        return {
            hour,
            minutes,
            seconds
        };
    }

    private parseTimeInfo(): TimeInfo {
        const timeString = this.date.toLocaleTimeString();

        return {
            timeString,
            ...CustomDate.formatTime(timeString)
        };
    }

    private getDateInfo(): DateInfo {
        return {
            ...this.parseTimeInfo(),
            ...this.parseDateInfo()
        };
    }

    toObject(): CustomDate.AsObject {
        return this.getDateInfo();
    }
}

export namespace CustomDate {
    export type AsObject = {} & DateInfo;
}