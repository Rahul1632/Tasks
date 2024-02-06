export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const emailValidRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const panCardRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
export const phoneRegex = /^[0]?[789]\d{9}$/;
export const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
export const pincodeRegex = /^[1-9][0-9]{5}$/;
export const alphabetRegex = /^[A-Za-z]+$/;
