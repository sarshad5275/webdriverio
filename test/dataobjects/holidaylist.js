import HolidayObj from "./holidayobj";
import moment from 'moment';

export default class HolidayList {
    constructor(data) {
        this.holidays = [];
        for (var item in data) {
            var holiday = new HolidayObj(data[item]);
            this.holidays.push(holiday);
        };
    };

    //Get the Current List of Holidays
    get getAllHolidays() {
        return this.holidays;
    };


    //Get the Holidays in between Start and end Date
    getAllHolidaysInBetween = (startDate, endDate) => {
        let dataInBetween = [];
        this.holidays.forEach(holidayData => {
            var m = moment(holidayData.day, 'YYYY-MM-DD');
            if (m.isSameOrAfter(startDate) && m.isSameOrBefore(endDate)) {
                dataInBetween.push(holidayData);
            }
        })

        return dataInBetween;
    };

    //Get Holidays ON or After given date
    getAllHolidaysOnOrAfter(date) {
        let filteredData = [];
        this.holidays.forEach(holidayData => {
            var m = moment(holidayData.day, 'YYYY-MM-DD');
            if (m.isSameOrAfter(date)) {
                filteredData.push(holidayData);
            }
        })

        return filteredData;
    };

    //Get holidays On or Before given date 
    getAllHolidaysOnOrBefore(date) {
        let filteredData = [];
        this.holidays.forEach(holidayData => {
            var m = moment(holidayData.day, 'YYYY-MM-DD');
            if (m.isSameOrBefore(date)) {
                filteredData.push(holidayData);
            }
        })

        return filteredData;
    }

    get sortByDate() {
        const sorted = this.holidays.sort((a, b) => {
            let da = new Date(a.day),
                db = new Date(b.day);
            return da - db;
        })
        return sorted;
    }
}