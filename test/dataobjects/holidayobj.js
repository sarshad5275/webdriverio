export default class HolidayObj {
    constructor(data){
        Object.assign(this, data);
    }

    id;
    clientId;
    clientName;
    name;
    day;
    holidayType;
    corporate;
    workable;
}
