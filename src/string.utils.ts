export const isEmail = (email: string) => {
  const emailRegEx =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  return emailRegEx.test(email);
};

export const trimMultipleSpace = (value: string) => {
  return value.replace(/\s\s+/g, ' ');
};

/**
 *
 * @param sanitizeString  removes html tags to prevent injection
 * @returns sanitised string
 */
const combining = /[\u0300-\u036F]/g;
export const sanitizeString = (str: string) => {
  str = str.replace(/[^a-z0-9!@#$.%#^á&é*íóúñü \.,_-]/gim, '');
  str = str.normalize('NFKD').replace(combining, '');
  if (str.trim() === '') {
    return null;
  }
  return str;
};

export function replaceStringWithParams(
  text: string,
  params?: Record<string, string | number>,
) {
  if (!params) return text;

  let returnText = text;

  for (const param in params) {
    if (params[param]) {
      returnText = returnText.replace(param, params[param].toString());
    }
  }

  return returnText;
}

export const capitalizeFirstLetter = (str?: string | null) => {
  if (str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }

  return null;
};

export function getPascalString(string?: string | null) {
  if (string) {
    const strings = trimMultipleSpace(string).split(' ');

    let s = '';

    strings.forEach(_s => {
      s += _s.charAt(0).toUpperCase() + _s.slice(1).toLowerCase();
      s += ' ';
    });

    return trimMultipleSpace(s.trim());

    // return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return null;
}

export function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

interface FullName {
  firstName: string;
  middleName?: string;
  lastName?: string;
}

export function splitName(fullname: string, locale?: string): FullName {
  const _fullname = fullname.split(' ');

  if (_fullname.length === 0) {
    return {
      firstName: '',
    };
  }

  let firstname = _fullname[0];
  let lastname;
  let middlename;

  firstname =
    firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();

  if (_fullname.length === 1) {
    return {
      firstName: firstname,
    };
  } else {
    lastname = _fullname[_fullname.length - 1] as Capitalize<string>;

    if (_fullname.length > 2) {
      middlename = _fullname.slice(1, _fullname.length - 1);
      middlename = middlename.join(' ');

      middlename =
        middlename.charAt(0).toUpperCase() + middlename.slice(1).toLowerCase();
    }

    lastname =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

    if (locale === 'ja') {
      const _firstname = firstname;
      firstname = lastname;
      lastname = _firstname;
    }

    return {
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
    };
  }
}
