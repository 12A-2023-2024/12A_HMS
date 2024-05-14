export class Datest {
    day: number
    month: number
    year: number

    constructor(day: number = -1, month: number = -1, year: number = -1) {
        if (day == -1 && month == -1 && year == -1) {
            let date = new Date()
            this.day = date.getDate()
            this.month = date.getMonth()
            this.year = date.getFullYear()
        }
        else {
            this.day = day
            this.month = month
            this.year = year
        }
    }

    /**
     * @returns The date in **YYYY-MM-DD** format
     */
    public toString(): string {
        let dateString = this.year.toString();

        dateString += '-';
        let actualMonth = this.month + 1
        if (actualMonth < 10) {
            dateString += '0';
        }
        dateString += actualMonth;
        dateString += '-';
        if (this.day < 10) {
            dateString += '0';
        }
        dateString += this.day;
        return dateString
    }

    /**
     * @param addDay Number of days to add
     * @returns The new date with the added days
     */
    public addDays(addDay: number): Datest {
        let date = new Date(this.year, this.month, this.day)
        date.setMilliseconds(date.getMilliseconds() + 8.64e+7 * addDay)
        
        this.day = date.getDate()
        this.month = date.getMonth()
        this.year = date.getFullYear()

        return this
    }

    /**
     * Supported string format: **YYYY-MM-DD**
     */
    public fromString(string: string): Datest {
        let year = Number(string.slice(0, 4))
        let month = Number(string.slice(5, 7))
        let day = Number(string.slice(8))
        return new Datest(day, month - 1, year);
    }
}