function formatDate (date) {
  const isoString = date.toISOString();

  const year = isoString.split('-')[0];
  const month = isoString.split('-')[1];
  const day = isoString.split('-')[2].slice(0, 2);

  const hour = isoString.split('T')[1].split(':')[0];
  const minute = isoString.split('T')[1].split(':')[1];

  const formattedDate = [year, month, day].join('/') + ' ' + [hour, minute].join(':');

  return formattedDate;
}

export default formatDate;
