import moment from 'moment';

const currentDate = moment();
let date = currentDate.date();

/*const appointments2 = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2021, 4, 7, 10, 35),
    endDate: new Date(2021, 4, 7, 11, 30),
    id: 0,
    location: 'Room 1',
  }
]*/

const makeTodayAppointment = (startDate, endDate) => {
  const days = moment(startDate).diff(endDate, 'days');
  const nextStartDate = moment(startDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date);
  const nextEndDate = moment(endDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date + days);

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};

/*
const makeAppointments = (rawAppointments) => {
    
    console.log('we shouldn\'t be calling this')
    return rawAppointments.map(({ startDate, endDate, ...restArgs }) => 
    {
        const result = 
        {
            ...makeTodayAppointment(startDate, endDate),
            ...restArgs,
        };

        date += 1;

        if (date > 31) 
        {
            date = 1;
        }

        return result;
});}
*/

/*
export default appointments2.map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    ...makeTodayAppointment(startDate, endDate),
    ...restArgs,
  };
  date += 1;
  if (date > 31) date = 1;
  return result;
});
*/

//export default makeAppointments