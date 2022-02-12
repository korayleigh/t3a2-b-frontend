export const capitalise = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

export const titleise = (string) => {
  return string.split(' ').map((word) => capitalise(word)).join(' ');
};

export const formatCentsAsDollars = (priceCents) => {
  // return (priceCents / 100).toFixed(2);
  const stringPriceCents = String(priceCents);
  while (stringPriceCents.length < 3) {
    '0'.concat(stringPriceCents);
  } 
  // Insert a . at a position 2 characters from the right
  return stringPriceCents.substring(0, stringPriceCents.length - 2) + '.' + stringPriceCents.substring(stringPriceCents.length -2);
};
