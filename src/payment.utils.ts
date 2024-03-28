export const isValidUpiAddress = (upi: string) => {
  const regexUpi = /^\w.+@\w+$/;
  return regexUpi.test(upi);
};

export function formatPrice(price: number | string, currency = 'INR') {
  const _price =
    typeof price === 'string' && price.trim() !== ''
      ? parseFloat(price)
      : price;

  // format number to Indian rupee
  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });

  if (typeof _price !== 'number') return '';

  // return `₹${price.toLocaleString('en-IN')}`;
  return rupee.format(_price);
}
