import {CreateEventValue} from 'common/form/app-form';
import moment from 'moment';
import * as Yup from 'yup';

export const createEventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),

  startTime: Yup.date().required('Start time is required').nullable(),

  endTime: Yup.date()
    .nullable()
    .test(
      'is-after-start',
      'End time must be after the start time',
      function (value) {
        const startTime = this.parent.startTime;
        return value ? moment(value).isAfter(moment(startTime)) : true; // Allow null or valid endTime
      },
    ),

  startDate: Yup.date()
    .required('Date is required')
    .nullable()
    .test('is-future', 'Date must be in the future', function (value) {
      return moment(value).isAfter(moment().startOf('day'));
    }),

  endDate: Yup.date()
    .nullable()
    .test(
      'is-after-start-date',
      'End date must be after the start date',
      function (value) {
        const startDate = this.parent.startDate;
        return value ? moment(value).isAfter(moment(startDate)) : true;
      },
    ),

  desc: Yup.string()
    .min(12, 'Description must be at least 12 characters')
    .required('Description is required'),

  location: Yup.object()
    .shape({
      lat: Yup.number().required('Latitude is required'),
      lng: Yup.number().required('Longitude is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      address: Yup.string().required('Address is required'),
    })
    .required('Location is required'),

  maxNumber: Yup.number()
    .required('Max Number is required')
    .positive('Max Number must be positive'),
});

export const processEventDates = (event: CreateEventValue) => {
  const startDateTime: string = moment(event.startDate)
    .set({
      hour: moment(event.startTime).hour(),
      minute: moment(event.startTime).minute(),
      second: moment(event.startTime).second(),
    })
    .toISOString();

  const endDateTime: string = event.endDate
    ? moment(event.endDate)
        .set({
          hour: moment(event.endTime).hour(),
          minute: moment(event.endTime).minute(),
          second: moment(event.endTime).second(),
        })
        .toISOString()
    : '';

  const startTimeHHmm: string = moment(event.startTime).format('HH:mm');

  const endTimeHHmm: string = event.endTime
    ? moment(event.endTime).format('HH:mm')
    : '';

  return {
    ...event,
    startDate: startDateTime,
    endDate: endDateTime,
    startTime: startTimeHHmm,
    endTime: endTimeHHmm,
  };
};
