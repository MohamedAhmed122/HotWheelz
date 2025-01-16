import moment from 'moment';

export const formateLongDate = (date: string) =>
  moment(date).format('ddd, MMMM DD, YYYY [at] h:mm A');
