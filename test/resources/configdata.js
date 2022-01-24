module.exports = {
   bambooURL: 'https://nexient.bamboohr.com',
   nexportURL: 'https://portal.nexient.com',
   nxAPIBaseUrl: 'https://portal.nexient.com/gateway/api',
   nxHolidaysEndpoint: `/timesheets/clients/KVcmlo/holidays?startDate=${new Date().toISOString().slice(0, 10)}&viewType=BRIEF`,
   nxEventsEndpoint:'/events',
   nxLoginEndpoint:'/authentication/authenticate',
   nxProfileEndpoint:'/employees',
   nxTenentId: 'nexient',
   nxVersion_1:'1',
   nxVersion_2:'2',
}