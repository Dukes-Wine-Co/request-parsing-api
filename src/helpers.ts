export const capitalizeFirstLetter: (string) => string = string => string.charAt(0).toUpperCase() + string.slice(1);

export const clearEmptyObjFields: (obj) => any = obj => JSON.parse(JSON.stringify(obj));
