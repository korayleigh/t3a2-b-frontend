export const capitalise = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

export const titleise = (string) => {
  return string.split(' ').map((word) => capitalise(word)).join(' ');
};

export const formatCentsAsDollars = (priceCents) => {
  return (priceCents / 100).toFixed(2);
};
