import { Page } from "../page.js";

export class ReservationPage extends Page {

    constructor() {
        super('/src/pages/reservation/reservation.html');
    }

    override getHtmlCallback() {
        const startDateField = document.getElementById('startDate');
        startDateField?.setAttribute('min', todayString());
        startDateField?.setAttribute('value', tomorrowString());
        const endDateField = document.getElementById('endDate');
        endDateField?.setAttribute('value', addOneDayToString(tomorrowString()));
        endDateField?.setAttribute('min', addOneDayToString(tomorrowString()));
    }
}

function dateToString(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1; //January is 0!
    const yyyy = date.getFullYear();

    let dateString = yyyy.toString();

    dateString += '-';
    if (mm < 10) {
        dateString += '0';
    }
    dateString += mm;
    dateString += '-';
    if (dd < 10) {
        dateString += '0';
    }
    dateString += dd;
    return dateString
}

function todayString(): string {
    const date = new Date()
    return dateToString(date)
}

function tomorrowString(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateToString(tomorrow)
}

function addOneDayToString(date: string): string {
    const day = parseInt(date.slice(8))
    const newDay = (day + 1) % 31
    return date.slice(0,8) + newDay
}