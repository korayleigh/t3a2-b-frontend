// export const capitalise = (string) => {
//   // return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
//   return sentenceCase(string);
// };

// export const titleise = (string) => {
//   // return string.split(' ').map((word) => capitalise(word)).join(' ');
//   return capitalCase(string);
// };

export const formatCentsAsDollars = (priceCents) => {
  // return (priceCents / 100).toFixed(2);
  const stringPriceCents = String(priceCents);
  while (stringPriceCents.length < 3) {
    '0'.concat(stringPriceCents);
  } 
  // Insert a . at a position 2 characters from the right
  return stringPriceCents.substring(0, stringPriceCents.length - 2) + '.' + stringPriceCents.substring(stringPriceCents.length -2);
};

export const formatDate = (isoDate, format='full' ) => {
  switch(format) {

  case 'full': {
    return new Date(isoDate).toLocaleString('en-AU', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'
    }); 
  }

  case 'short': {
    return new Date(isoDate).toLocaleString('en-AU', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
    });
  }

  }
};