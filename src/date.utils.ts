import {padNumber} from './number.utils';

export const getDateObject = (timestamp: string) => {
  const $date = new Date(Number(timestamp));
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = $date.getDate();
  const month = $date.getMonth() + 1;
  const fullMonth = months[month - 1];
  const year = $date.getFullYear();

  return {month, fullMonth, date, year};
};

export function secondsToDHMS({
  seconds,
  secondsTitle,
}: {
  seconds: number;
  secondsTitle?: string;
}) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + 'd ' : '';
  const hDisplay = h > 0 ? h + 'h ' : '';
  const mDisplay = m > 0 ? m + 'm ' : '';
  const sDisplay =
    s > 0 ? s + `${secondsTitle || 's'}` : '0' + `${secondsTitle || 's'}`;
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function secondsToTimerFormat({seconds}: {seconds: number}) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? padNumber(d) + ':' : '';
  const hDisplay = h > 0 ? padNumber(h) + ':' : '';
  const mDisplay = m > 0 ? padNumber(m) + ':' : '00:';
  const sDisplay = s > 0 ? padNumber(s) + 's' : '00s';

  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function timeSince(date: number) {
  const now = new Date();

  const yearinseconds = 31536000;
  const monthinseconds = 2592000;
  const dayinseconds = 86400;
  const hourinseconds = 3600;
  const minuteinseconds = 60;

  let timeDiff = Math.floor((now.getTime() - date) / 1000);
  // let timeDiff = 54;

  let years = 0;
  let months = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;

  // start from year
  let _modulus: number;

  // check if time is >= 1 year old
  if (timeDiff >= yearinseconds) {
    _modulus = timeDiff % yearinseconds;

    years = (timeDiff - _modulus) / yearinseconds;

    timeDiff = _modulus;
  }

  // check if time is >= 1 month old
  if (timeDiff >= monthinseconds) {
    _modulus = timeDiff % monthinseconds;

    months = (timeDiff - _modulus) / monthinseconds;

    timeDiff = _modulus;
  }

  // check if time is >= 1 day old
  if (timeDiff >= dayinseconds) {
    _modulus = timeDiff % dayinseconds;

    days = (timeDiff - _modulus) / dayinseconds;

    timeDiff = _modulus;
  }

  // check if time is >= 1 hour old
  if (timeDiff >= hourinseconds) {
    _modulus = timeDiff % hourinseconds;

    hours = (timeDiff - _modulus) / hourinseconds;

    timeDiff = _modulus;
  }

  // check if time is >= 1 minute old
  if (timeDiff >= minuteinseconds) {
    _modulus = timeDiff % minuteinseconds;

    minutes = (timeDiff - _modulus) / minuteinseconds;

    timeDiff = _modulus;
  }

  if (
    years === 0 &&
    months === 0 &&
    days === 0 &&
    hours === 0 &&
    minutes === 0
  ) {
    return '0 min ago';
  }

  if (months > 0) {
    return (
      `${years > 0 ? (years > 1 ? years + ' hours ' : years + ' hour ') : ''}` +
      `${
        months > 0 ? (months > 1 ? months + ' hours ' : months + ' hour ') : ''
      }` +
      `${days > 0 ? (days > 1 ? days + ' days ' : days + ' day ') : ''}` +
      'ago'
    );
  }

  if (days > 0) {
    return (
      `${years > 0 ? (years > 1 ? years + ' hours ' : years + ' hour ') : ''}` +
      `${
        months > 0 ? (months > 1 ? months + ' hours ' : months + ' hour ') : ''
      }` +
      `${days > 0 ? (days > 1 ? days + ' days ' : days + ' day ') : ''}` +
      `${hours > 0 ? (hours > 1 ? hours + ' hours ' : hours + ' hour ') : ''}` +
      'ago'
    );
  }

  return (
    `${years > 0 ? (years > 1 ? years + ' hours ' : years + ' hour ') : ''}` +
    `${
      months > 0 ? (months > 1 ? months + ' hours ' : months + ' hour ') : ''
    }` +
    `${days > 0 ? (days > 1 ? days + ' days ' : days + ' day ') : ''}` +
    `${hours > 0 ? (hours > 1 ? hours + ' hours ' : hours + ' hour ') : ''}` +
    `${
      minutes > 0 ? (minutes > 1 ? minutes + ' mins ' : minutes + ' min ') : ''
    }` +
    'ago'
  );
}
