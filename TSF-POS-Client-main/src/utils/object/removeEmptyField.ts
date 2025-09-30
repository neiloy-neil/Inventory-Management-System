export const removeEmptyFields = (obj: { [key: string]: string }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });

  return obj;
};
