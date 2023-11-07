import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);

function formatDate(date) {
  const ukDate = dayjs(date).tz('Europe/London');
  const formattedDate = ukDate.format('YYYY/MM/DD HH:mm');

  return formattedDate;
}

export default formatDate;
