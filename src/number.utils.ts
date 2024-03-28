export const isPhoneNumber = (phoneNumber: string, withCountryCode = false) => {
  const phoneNumberRegEx = withCountryCode
    ? /(?<countryCode>[\+]{1}[0-9]{1,3})(?<phoneNumber>[0-9]{10})/
    : /^[0-9]{10}$/;

  return phoneNumberRegEx.test(phoneNumber);
};

export const isNumber = (value: string) => {
  const isValidInput = /^[0-9]+$/.test(value);

  return isValidInput;
};

export const getFormattedNumber = (number: number) => {
  if (!number || isNaN(number)) {
    return '0';
  }

  const _number = Intl.NumberFormat('en-IN');
  return _number.format(number);
};

export const randomValue = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomIntValue = (min: number, max: number) => {
  return Math.floor(randomValue(min, max));
};

export function padNumber(number: number) {
  return number < 10 ? '0' + number.toString() : number.toString();
}
