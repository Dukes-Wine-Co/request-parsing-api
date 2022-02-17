export interface Day {
    dayOfWeek: string;
    month: string;
    year: string;
    dateString: string;
    day: string
}

export interface Time {
    seconds: string;
    hour: string;
    minutes: string
}

export interface TimeInfo extends Time {
    timeString: string
}

export interface DateInfo extends TimeInfo, Day {

}