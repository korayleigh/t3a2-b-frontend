
export const formatCentsAsDollars = (priceCents) => {
  let stringPriceCents = String(priceCents).replace(/\D/g, '');
  while (stringPriceCents.length < 3) {
    stringPriceCents = '0'.concat(stringPriceCents);

  } 
  // Insert a . at a position 2 characters from the right
  return stringPriceCents.substring(0, stringPriceCents.length - 2) + '.' + stringPriceCents.substring(stringPriceCents.length -2);
};

export const formatDollarsAsCents = (priceDollars) => {
  // expect a string with digits and a '.' in a position 3rd form the right'
  return parseInt(priceDollars.replace(/\D/g, ''));

};

export const reformatDollarsAsDollars = (priceDollars) => {
  // expect a string with a '.' in the wrong place due to editing in a text field
  return formatCentsAsDollars(formatDollarsAsCents(priceDollars));
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