const createQueryParams = (name: string, params: string[] | string): string => {
  let resultParams: string = "";
  if (params.length === 0) return resultParams;

  resultParams += "&" + name + "=";
  if (typeof params == "string") resultParams += params;
  else {
    for (let i = 0; i < params.length; i++) {
      resultParams += params[i];
      resultParams += i < params.length - 1 ? "%2C" : "";
    }
  }

  return resultParams;
};

export default createQueryParams;
