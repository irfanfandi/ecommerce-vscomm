export const isRequired = (obj: any, key: string) => {
  if (Object.keys(obj).indexOf(key) == -1)
    throw new Error(`${key} is required`);
  if (obj[key] === null || obj[key] === undefined || obj[key] === "")
    throw new Error(`${key} is required`);
  if (Array.isArray(obj[key]) && obj[key].length === 0)
    throw new Error(`${key} is required`);
  return true;
};

export const isEmail = (data: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/gi.test(data)) {
    return true;
  }

  throw new Error("email is not falid");
};

export const isPhoneNumber = (data: string) => {
  if (/^\+\d{11,14}$/gi.test(data)) {
    return true;
  } else {
    throw new Error("phone is not valid");
  }
};

export const isNumber = (value: number, key: string) => {
  if (typeof value != "number") throw new Error(`${key} is not number`);
};

export const isBoolean = (value: boolean, key: string) => {
  if (typeof value != "boolean") throw new Error(`${key} is not boolean`);
};
