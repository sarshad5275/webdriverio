export default class ProfileData {
    constructor(data){
        Object.assign(this, data);
    }
    active;
    id;
    employeeNetworkId;
    employeeNumber;
    billableType;
    firstName;
    lastName;
    preferredName;
    email;
    manager;
    jobTitle;
    department;
    employeeType;
    emailNotification;
    timesheetExempt;
    mobilePhone;
    managerAssignmentType;
    externalId;
    careerCoach;
    division;
    practice;
    hireDate;
    officeLocation;

    get fullName(){
        return this.firstName + " " + this.lastName;
    }
}